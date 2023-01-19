import React, {useReducer} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const initialState = {
  firstName: {
    value: "",
    error: null,
  },
  lastName: {
    value: "",
    error: null,
  },
  email: {
    value: "",
    error: null,
  },
};

const validEmail = (email) => {
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(mailFormat) ? "" : "El email no es válido";
};

function reducer(state, action) {
  switch (action.type) {
    case "firstName":
      return {
        ...state,
        firstName: {
          value: action.payload,
          error:
            action.payload.length !== null && action.payload.length < 2
              ? "El Nombre debe tener al menos dos caracteres"
              : "",
        },
      };
    case "lastName":
      return {
        ...state,
        lastName: {
          value: action.payload,
          error:
            action.payload.length !== null && action.payload.length < 2
              ? "El Nombre debe tener al menos dos caracteres"
              : "",
        },
      };
    case "email":
      return {
        ...state,
        email: {
          value: action.payload,
          error: validEmail(action.payload),
        },
      };
    default: {
      return state;
    }
  }
}

const SimpleForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({
      type: e.target.name,
      payload: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Formulario Simple</h1>
      <Form.Group className="mb-3" controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={state.firstName.value}
          onChange={handleChange}
        />
        {state.firstName.error && <p>{state.firstName.error}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={state.lastName.value}
          onChange={handleChange}
        />
        {state.lastName.error && <p>{state.lastName.error}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={state.email.value}
          onChange={handleChange}
        />
        {state.email.error && <p>{state.email.error}</p>}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SimpleForm;
