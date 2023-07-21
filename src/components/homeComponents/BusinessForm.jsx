import {Button, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useFetching} from "../utils/CustomHooks/useFetching";
import axios from "axios";


const BusinessForm = () => {
    const [noLinks, setNoLinks] = useState(false);

    const handleCheckboxChange = (e) => {
        setNoLinks(e.target.checked);
    };
    return (
        <>

            <div className={'container-sm mt-5 d-flex justify-content-center'}>
                <Form className={'w-50 d-flex flex-wrap gap-5 justify-content-center'}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type={'text'} placeholder="Enter name"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Surname</Form.Label>
                        <Form.Control type={'text'} placeholder="Enter name"/>
                        <Form.Text className="text-muted">
                            We should known little more about u.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className={'w-75'}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type={'text'} placeholder="Enter Address"/>
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
                        />
                        <Form.Check type="checkbox" label="Click if you doesn't have any links" onChange={handleCheckboxChange}/>
                    </Form.Group>
                    <Form.Group className={'w-75'}>
                        <Form.Label>IČO</Form.Label>
                        <Form.Control type={'text'} placeholder="Enter IČO"/>
                    </Form.Group>
                    <Form.Group className={'w-75'}>
                        <Form.Label>Type of products</Form.Label>
                        <Form.Select type={'text'} placeholder="Choose type of products">
                            <option value="">Select Category</option>
                            //categories
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="w-100">
                        <Form.Label>Description of your activity</Form.Label>
                        <Form.Control as="textarea" rows={3} />
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