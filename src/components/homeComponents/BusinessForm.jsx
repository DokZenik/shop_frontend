import {Button, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useFetching} from "../utils/CustomHooks/useFetching";
import axios from "axios";
import {Link} from "react-router-dom";


const BusinessForm = () => {
    const [noLinks, setNoLinks] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    let objectForDisplay = {}

    useEffect(() => {
        // Fetch categories and subcategories when the component mounts
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                "https://platz-shop-api.onrender.com/api/categories",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log(response.data);

            // The response.data should be an array of categories and subcategories
            // directly set it to the subcategories state
            formCategories(response.data, "");
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const formCategories = (data, title) => {
        const buff = data.filter(elem => elem.title === title)

        buff.forEach(elem => objectForDisplay[elem.value] = [])

        if (data.length > buff.length)
            Object.entries(objectForDisplay).forEach(([category, subcategoryList]) => {

                objectForDisplay[category] = data.filter(elem => elem.title === category).map(elem => {
                    return {name: elem.value, items: []}
                })

                objectForDisplay[category].forEach(elem => elem.items = data.filter(item => item.title === elem.name).map(elem => {
                    return {name: elem.value}
                }))

            })
        setSubcategories(objectForDisplay)
    }

    const [formDate, setFormDate] = useState({
        name: "",
        surname: "",
        email: "",
        address: "",
        websiteLink: "",
        ico: "",
        productsType: "",
        description: "",
        status: "WAITING"
    })

    const handleCheckboxChange = (e) => {
        setNoLinks(e.target.checked);
    };
    const formHandler = (e) => {
        e.preventDefault()
        axios.post("https://platz-shop-api.onrender.com/api/seller/application/save", {formDate})
            // axios.post("http://localhost:5000/api/seller/application/save", {formDate})
            .then(res => {
                if (res.status === 200)
                    setFormDate({
                        name: "",
                        surname: "",
                        email: "",
                        address: "",
                        websiteLink: "",
                        ico: "",
                        productsType: "",
                        description: "",
                        status: "WAITING"
                    })
                else
                    console.log("something was wrong")
            })
            .catch(e => {

            })
    }
    return (
        <>

            <div className={'container-sm mt-5 d-flex justify-content-center'}>
                <Form className={'w-50 d-flex flex-wrap gap-5 justify-content-start businessForm'} onSubmit={formHandler}
                      action={"#"}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type={'text'}
                            placeholder="Enter name"
                            value={formDate.name}
                            onChange={e => setFormDate({...formDate, name: e.target.value})}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Surname</Form.Label>
                        <Form.Control
                            type={'text'}
                            placeholder="Enter surname"
                            value={formDate.surname}
                            onChange={e => setFormDate({...formDate, surname: e.target.value})}/>
                        <Form.Text className="text-muted">
                            We should known little more about u.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className={''}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type={'text'}
                            placeholder="Enter Address"
                            value={formDate.address}
                            onChange={e => setFormDate({...formDate, address: e.target.value})}/>
                        <Form.Text className="text-muted">
                            Write only your/your company's actual address.
                        </Form.Text>
                    </Form.Group>
                    {/* my changes */}
                    <Form.Group className={''}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type={'text'}
                            placeholder="Enter Email"
                            value={formDate.email}
                            onChange={e => setFormDate({...formDate, email: e.target.value})}
                        />
                        <Form.Text className="text-muted">
                            Write only your/your company's actual address.
                        </Form.Text>
                    </Form.Group>
                    {/* my changes */}
                    <Form.Group className={''}>
                        <Form.Label>Link</Form.Label>
                        <Form.Control type={'text'}
                                      placeholder="link to your website"
                                      className={'mb-3'}
                                      disabled={noLinks}
                                      value={formDate.websiteLink}
                                      onChange={e => setFormDate({...formDate, websiteLink: e.target.value})}
                        />
                        <Form.Check type="checkbox"
                                    label="Click if you doesn't have any links"
                                    onChange={handleCheckboxChange}
                                    className={'w-50'}/>
                    </Form.Group>
                    <Form.Group className={''}>
                        <Form.Label>IČO</Form.Label>
                        <Form.Control
                            type={'text'}
                            placeholder="Enter IČO"
                            value={formDate.ico}
                            onChange={e => setFormDate({...formDate, ico: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className={'businessFormType'}>
                        <Form.Label>Type of products</Form.Label>
                        <Form.Select
                            type={'text'}
                            placeholder="Choose type of products"
                            onChange={e => setFormDate({...formDate, productsType: e.target.value})}>
                            <option value="testValue">Select Category</option>
                            {Object.entries(subcategories).map(([category, subcategoryList]) => {
                                if (subcategoryList.length === 0) {
                                    return (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    );
                                } else {
                                    return subcategoryList.map((subcat) => {
                                        return (
                                            <optgroup key={subcat.name} label={subcat.name}>
                                                {subcat.items.map((item) => (
                                                    <option key={item.name} value={item.name}>
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        );
                                    });
                                }
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="businessFormActivity">
                        <Form.Label>Description of your activity</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={formDate.description}
                            onChange={e => setFormDate({...formDate, description: e.target.value})}/>
                    </Form.Group>
                    <div className={'d-flex justify-content-between align-items-center gap-5'}>
                        <Button variant="dark" type="submit">
                            Submit
                        </Button>
                        <Link to={'/'} className={'btn btn-dark'}>
                            Back
                        </Link>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default BusinessForm;