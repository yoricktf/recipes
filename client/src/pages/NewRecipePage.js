import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { AuthContext } from '../context/auth'
import service from "../api/service";



const NewRecipePage = () => {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext)
  const [recipeName, setRecipeName] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [description, setDescription] = useState('')
  const [recipePicture, setRecipePicture] = useState('')
  const [method, setMethod] = useState('')
  const [prepTime, setPrepTime] = useState(0)
  const [cookTime, setCookTime] = useState(0)
  const [servingSize, setServingSize] = useState(0)
  const [difficulty, setDifficulty] = useState('')
  const [tags, setTags] = useState([])
  const [author, setAuthor] = useState(user)
  const [published, setPublished] = useState(false)

  const newRecipe = e => {
    e.preventDefault()
    axios.post('/recipe/newRecipe', { recipeName, ingredients, recipePicture, description, method, prepTime, cookTime, servingSize, difficulty, author, tags, published })
  }

  const handleFileUpload = e => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("recipePicture", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "secure_url" which we can use to update the state
        setRecipePicture(response.secure_url);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  return (
    <>
      <Container>
        <h1>NewRecipePage</h1>
        <Form onSubmit={newRecipe}>
          <Form.Group className="mb-3" controlId="recipeName">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control onChange={e => setRecipeName(e.target.value)} type="text" placeholder="enter ingredient and add here" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control onChange={e => setDescription(e.target.value)} type="text" placeholder="enter method step by step" />
          </Form.Group>

          <input type="file" onChange={(e) => handleFileUpload(e)} />

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Ingredients</Form.Label>
            <Form.Text className="text-muted">
              enter the ingredients seperated by a dash ( - )
            </Form.Text>
            {/* <Form.Control onChange={e => setIngredients(e.target.value)} type="text" placeholder="" /> */}
            <Form.Control onChange={e => setIngredients(e.target.value.split('-'))} type="text" placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="">
            <Form.Label>Method</Form.Label>
            <Form.Text className="text-muted">
              enter the different steps seperated by a dash ( - )
            </Form.Text>
            <Form.Control onChange={e => setMethod(e.target.value.split('-'))} type="text" placeholder="" />
          </Form.Group>

          <Row>
            <Col>
              <Form.Label>Prep Time</Form.Label>
              <Form.Select onChange={e => setPrepTime(e.target.value)}>
                <option value="0-15">0-15</option>
                <option value="15-30">15-30</option>
                <option value="30-60">30-60</option>
                <option value="60-90">60-90</option>
                <option value="90-120">90-120</option>
                <option value=">120">>120</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>Cooking Time</Form.Label>
              <Form.Select onChange={e => setCookTime(e.target.value)}>
                <option value="0-15">0-15</option>
                <option value="15-30">15-30</option>
                <option value="30-60">30-60</option>
                <option value="60-90">60-90</option>
                <option value="90-120">90-120</option>
                <option value=">120">>120</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Serving Size</Form.Label>
                <Form.Control onChange={e => setServingSize(e.target.value)} type="text" placeholder="Serving Size" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Difficulty</Form.Label>
              <Form.Select onChange={e => setDifficulty(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>

            <Col>
              <Form.Check
                inline
                type="switch"
                id="custom-switch"
                label="Vegan"
                value="vegan"
                onChange={e => setTags(...tags, e.target.value)}
              />
              <Form.Check
                inline
                type="switch"
                id="custom-switch"
                label="Vegetarian"
                value="vegetarian"
                onChange={e => setTags(...tags, e.target.value)}
              />
            </Col>
          </Row>
          <Button variant="danger" type="submit">
            Make Recipe
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default NewRecipePage
