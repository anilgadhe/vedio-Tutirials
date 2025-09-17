import axios from "axios";
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom";
import *as yup from 'yup';


export function AddVedio() {

    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: {

            title: '',
            description: '',
            url: '',
            likes: 0,
            dislikes: 0,
            views: 0,
            comments: '',
            category_id: 0
        },
        validationSchema:yup.object({
            title:yup.string().required("title is required"),
            description:yup.string().required("description is required"),
             url:yup.string().required("URL is required"),
            category_id:yup.number().required("Category_id is required"),
        }),
        onSubmit: (vedio) => {
            const data = {

                title: vedio.title,
                description: vedio.description,
                url: vedio.url,
                likes: parseInt(vedio.likes),
                dislikes: parseInt(vedio.dislikes),
                views: parseInt(vedio.views),
                comments: vedio.comments,
                category_id: parseInt(vedio.category_id),

                likedBy:[],
                dislikedBy:[]
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
                    <dt>title</dt>
                    <dd><input type="text" name="title" onChange={formik.handleChange} className="form-control" autoFocus/></dd>
                    <dd className="text-danger">{formik.errors.title}</dd>

                    <dt>description</dt>
                    <dd><input type="text" name="description" onChange={formik.handleChange} className="form-control" /></dd>
                    <dd className="text-danger">{formik.errors.description}</dd>


                    <dt>url</dt>
                    <dd><input type="text" name="url" onChange={formik.handleChange} className="form-control" /></dd>
                    <dd className="text-danger">{formik.errors.url}</dd>


                    <dt>likes</dt>
                    <dd><input type="number" name="likes" onChange={formik.handleChange} className="form-control" /></dd>

                    <dt>dislikes</dt>
                    <dd><input type="number" name="dislikes" onChange={formik.handleChange} className="form-control" /></dd>

                    <dt>views</dt>
                    <dd><input type="number" name="views" onChange={formik.handleChange} className="form-control" /></dd>

                    <dt>comments</dt>
                    <dd><input type="text" name="comments" onChange={formik.handleChange} className="form-control" /></dd>

                    <dt>category_id</dt>
                    <dd>
                        <select name="category_id" onChange={formik.handleChange}>
                            <option value="-1">select Category</option>
                            <option value="1">Java</option>
                            <option value="2">React</option>
                            <option value="3">AWS</option>
                        </select>
                    </dd>
                    <dd className="text-danger">{formik.errors.category_id}</dd>

                </dl>
                <button className="btn btn-success" disabled={(formik.isValid)?false:true} type="submit">Add</button>
                <Link to="/admin-dashboard" className="btn btn-danger mx-2">Cancel</Link>
            </form>
        </div>
    )
}