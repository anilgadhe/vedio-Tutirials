import axios from "axios";
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom";


export function AddVedio() {

    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: {
            id: '',
            title: '',
            description: '',
            url: '',
            likes: 0,
            dislikes: 0,
            views: 0,
            comments: '',
            category_id: 0
        },
        onSubmit: (vedio) => {
            const data = {
                id: vedio.id,
                title: vedio.title,
                description: vedio.description,
                url: vedio.url,
                likes: parseInt(vedio.likes),
                dislikes: parseInt(vedio.dislikes),
                views: parseInt(vedio.views),
                comments: vedio.comments,
                category_id: parseInt(vedio.category_id)
            }

            axios.post('http://localhost:3000/videos', data).then(response => {
                console.log(response.data);

                alert("vedio Added successfully");
                navigate("/admin-dashboard")
            })


                .catch((err) => {
                    console.log(`fialed to add:${err}`);

                })
        }
    });



    return (
        <div className="container-fluid bg-light w-75 rounded rounded-1">
            <h2 className="text-center">Add Vedios</h2>
            <form onSubmit={formik.handleSubmit} className="px-3" >

                <dl>
                    <dt>id</dt>
                    <dd><input type="text" name="id" onChange={formik.handleChange} className="form-control" /></dd>

                    <dt>title</dt>
                    <dd><input type="text" name="title" onChange={formik.handleChange} className="form-control" /></dd>

                    <dt>description</dt>
                    <dd><input type="text" name="description" onChange={formik.handleChange} className="form-control" /></dd>

                    <dt>url</dt>
                    <dd><input type="text" name="url" onChange={formik.handleChange} className="form-control" /></dd>

                    <dt>likes</dt>
                    <dd><input type="number" name="likes" onChange={formik.handleChange} className="form-control" /></dd>

                    <dt>dislikes</dt>
                    <dd><input type="number" name="dislikes" onChange={formik.handleChange} className="form-control" /></dd>

                    <dt>views</dt>
                    <dd><input type="number" name="views" onChange={formik.handleChange} className="form-control" /></dd>

                    <dt>comments</dt>
                    <dd><input type="text" name="comments" onChange={formik.handleChange} className="form-control" /></dd>

                    <dt>category_id</dt>
                    <dd><input type="number" name="category_id" onChange={formik.handleChange} className="form-control" /></dd>

                </dl>
                <button className="btn btn-success" type="submit">Add</button>
                <Link to="/admin-dashboard" className="btn btn-danger mx-2">Cancel</Link>
            </form>
        </div>
    )
}