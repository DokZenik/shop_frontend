import {Button, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useFetching} from "../utils/CustomHooks/useFetching";
import axios from "axios";


const BusinessForm = () => {
    const [noLinks, setNoLinks] = useState(false);

    const [formDate, setFormDate] = useState({
        name: "",
        surname: "",
        email: "TE",
        address: "",
        websiteLink: "",
        ico: "",
        productsType: "TT",
        description: ""
    })

    const handleCheckboxChange = (e) => {
        setNoLinks(e.target.checked);
    };
    const formHandler = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/api/seller/application/save", {formDate})
            .then(res => console.log(res))
            .catch(e => console.log(e))
    }
    return (
        <>

            <div className={'container-sm mt-5 d-flex justify-content-center'}>
                <Form className={'w-50 d-flex flex-wrap gap-5 justify-content-center'} onSubmit={formHandler} action={"#"}>
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
                        />
                        <Form.Text className="text-muted">
                            We should known little more about u.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className={'w-75'}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type={'text'}
                            placeholder="Enter Address"
                            value={formDate.address}
                            onChange={e => setFormDate({...formDate, address: e.target.value})}/>
                        />
                        <Form.Text className="text-muted">
                            Write only your/your company's actual address.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className={'w-75'}>
                        <Form.Label>Link</Form.Label>
                        <Form.Control type={'text'}
                                      placeholder="Enter actual link to your website"
                                      className={'mb-3'}
                                      disabled={noLinks}
                                      value={formDate.websiteLink}
                                      onChange={e => setFormDate({...formDate, websiteLink: e.target.value})}/>
                        />
                        <Form.Check type="checkbox" label="Click if you doesn't have any links" onChange={handleCheckboxChange}/>
                    </Form.Group>
                    <Form.Group className={'w-75'}>
                        <Form.Label>IČO</Form.Label>
                        <Form.Control
                            type={'text'}
                            placeholder="Enter IČO"
                            value={formDate.ico}
                            onChange={e => setFormDate({...formDate, ico: e.target.value})}/>
                        />
                    </Form.Group>
                    <Form.Group className={'w-75'}>
                        <Form.Label>Type of products</Form.Label>
                        <Form.Select
                            type={'text'}
                            placeholder="Choose type of products"
                            onChange={e => setFormDate({...formDate, productsType: e.target.value})}>
                            <option value="testValue">Select Category</option>
                            //categories
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="w-100">
                        <Form.Label>Description of your activity</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={formDate.description}
                            onChange={e => setFormDate({...formDate, description: e.target.value})}/>
                        />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default BusinessForm;