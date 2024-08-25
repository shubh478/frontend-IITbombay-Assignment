import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CreateInstance.module.css";

function CreateInstance({ refreshTrigger }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await axios.get("http://localhost:8000/api/courses/");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Failed to load courses");
      }
    }
    loadCourses();
  }, [refreshTrigger]);

  const handleRefresh = async () => {
    setSelectedCourse("");
    setYear("");
    setSemester("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedCourse || !year || !semester) {
      alert("Please fill out all fields");
      return;
    }

    const newInstance = { course: selectedCourse, year, semester };
    console.log("instance :", newInstance);

    try {
      await axios.post("http://localhost:8000/api/instances/", newInstance);

      setSelectedCourse("");
      setYear("");
      setSemester("");
      alert("Course instance created successfully!");
    } catch (error) {
      console.error("Error creating course instance:", error);
      alert("Failed to create course instance");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Create a New Course Instance</h2>

      <div className={styles.formGroupContainer}>
        <div className={styles.selectContainer}>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className={styles.select}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          <div className={styles.refreshButton} onClick={handleRefresh}>
            Refresh
          </div>
        </div>
        <div className={styles.formGroup2}>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={styles.input}
            placeholder="YYYY"
          />
          <input
            type="number"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className={styles.input}
            placeholder="1 or 2"
          />
        </div>
      </div>

      <button type="submit" className={styles.button}>
        Add Instance
      </button>
    </form>
  );
}

export default CreateInstance;
