import { useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import "./header.css";
import "./content.css";
import "./article.css";

function App() {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  console.log({photos})
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={(values) =>
            axios
              .get(
                `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
                {
                  headers: {
                    Authorization:
                      "Client-ID 8AjWqDpdq4WF9MaHe-VzZEGFwDGfRVHExAHpcpRajUw",
                  },
                }
              )
              .then((response) => {
                setPhotos(response.data.results)
              })
              .catch((err) => {
                console.log(err.response);
              })
          }
        >
          <Form>
            <label></label>
            <Field name="search" type="text" placeholder="Search here your images" />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo => 
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular}/>
              <p>{[photo.description, photo.alt_description].join(" - ")}</p>
            </article>)}
        </div>
      </div>
    </div>
  );
}

export default App;
