import React, { useState } from "react";
import axios from "axios";
import styles from "./CreateCourse.module.css";

function CreateCourse({ onCourseCreated }) {
  const [title, setTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCourse = { title, course_code: courseCode, description };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/courses/",
        newCourse
      );

      if (response.status === 201) {
        setTitle("");
        setCourseCode("");
        setDescription("");
        onCourseCreated();

        alert("Course created successfully!");
      } else {
        alert("Failed to create course.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the course.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Create a New Course</h2>
      <div className={styles.formGroup}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          placeholder="Course title"
        />
      </div>
      <div className={styles.formGroup}>
        <input
          type="text"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          className={styles.input}
          placeholder="Course code"
        />
      </div>
      <div className={styles.formGroup}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          placeholder="Course description"
        ></textarea>
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.button}>
          Create Course
        </button>
      </div>
    </form>
  );
}

export default CreateCourse;
