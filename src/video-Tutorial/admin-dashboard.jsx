import { useCallback, useEffect, useMemo, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";


export function AdminDashboard() {
    let location = useLocation();
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("title");
    const [filterCategory, setFilterCategory] = useState("all");
    let navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['admin_id']);
    const [vedios, setVedio] = useState([{ id: null, title: null, description: null, url: null, comment: null, likes: 0, dislike: 0, category_id: 0 }])

    const loadVedio = useCallback(() => {
        setLoading(true)
        axios.get('http://localhost:3000/videos').then(async response => {
            setVedio(await response.data)
            setLoading(false);
        })
            .catch((err) => {
                setLoading(false);
                console.log("falied to load vedios:", err);

            })
    }, [])

    useEffect(() => {
        var Cookie = navigator.cookieEnabled;
        if (cookies.admin_id === undefined) {
            navigate("/admin-login");
        } else {
            loadVedio();
        }
    }, [cookies.admin_id, navigate, loadVedio])

    const processedVideos = useMemo(() => {
        let filtered = [...vedios];

        if (searchTerm.trim("") !== "") {
            const lowerSearch = searchTerm.toLowerCase();

            filtered = filtered.filter((vedio) => {

                return (vedio.title && vedio.title.toLowerCase().includes(lowerSearch)) || (vedio.description && vedio.description.toLowerCase().includes(searchTerm));
            })

        }

        if (filterCategory !== "all") {

            filtered = filtered.filter((vedio) => (
                vedio.category_id === Number(filterCategory)
            ))

        }


        filtered.sort((a, b) => {

            if (sortBy === "title") return a.title.localeCompare(b.title);
            if (sortBy === "likes") return b.likes - a.likes;
            if (sortBy === "views") return b.views - a.views;

            return 0;
        })

        return filtered;
    }, [vedios, searchTerm, sortBy, filterCategory]);

    const videoRows = useMemo(() => {
        if (processedVideos.length === 0) {
            return (
                <tr>
                    <td colSpan="3" className="text-center text-muted">
                        No videos available
                    </td>
                </tr>
            );
        }


        return processedVideos.map((video) => (
            <tr key={video.id}>
                <td>{video.title}</td>
                <td>
                    <iframe
                        width="200"
                        height="100"
                        src={video.url}
                        title={video.title}
                        allowFullScreen
                    />
                </td>
                <td>
                    <Link
                        to={`edit-vedio/${video.id}`}
                        className="btn btn-warning bi bi-pen-fill"
                    ></Link>
                    <Link
                        to={`delete-vedio/${video.id}`}
                        className="btn btn-danger bi bi-trash-fill mx-2"
                    ></Link>
                </td>
            </tr>
        ));
    }, [processedVideos])

    const isLocation = location.pathname.includes("add-vedio") || location.pathname.includes("edit-vedio") || location.pathname.includes("delete-vedio");

    const handleSignout = useCallback(() => {
        removeCookie("admin_id");

        navigate("/admin-login")

    }, [removeCookie, navigate]);

    return (
        <div className="bg-light p-2">
            <h3 className="d-flex justify-content-between">
                <span>{cookies["admin_id"]} - Dashboard</span>
                <button onClick={handleSignout} className="btn btn-link">
                    Signout
                </button>
            </h3>

            <div className="mt-2">
                <Link
                    to="add-video"
                    className="btn btn-success bi bi-camera-video my-2"
                >
                    {" "}Add Video
                </Link>

                {/*  Search + Sorting + Filtering Controls */}
                <div className="d-flex flex-wrap gap-2 mb-3 " >
                    <input
                        type="text"
                        className="form-control w-auto"
                        placeholder="Search by title or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        className="form-select w-auto"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="title">Sort by Title</option>
                        <option value="likes">Sort by Likes</option>
                        <option value="views">Sort by Views</option>
                    </select>

                    <select
                        className="form-select w-auto"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        <option value="1">Java</option>
                        <option value="2">React</option>
                        <option value="3">AWS</option>
                    </select>
                </div>

                <div className="row">
                    <div className={isLocation ? "col-12 col-lg-5 col-md-12" : "col-12"}>
                        {loading ? (
                            <div className="text-center my-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Preview</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>{videoRows}</tbody>
                            </table>
                        )}
                    </div>

                    <div className={isLocation ? "col-12 col-lg-7 col-md-12" : "col-0"}>
                        <Outlet />
                    </div>
                </div>

            </div>

        </div>
    );


}