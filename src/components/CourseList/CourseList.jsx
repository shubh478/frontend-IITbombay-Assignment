import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CourseList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CourseList({ refreshTrigger }) {
  const [courses, setCourses] = useState([]);
  const [showAllCourse, setShowAllCourse] = useState(false);

  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await axios.get("http://localhost:8000/api/courses/");
        console.log("res :", response);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Failed to load courses");
      }
    }
    loadCourses();
  }, [refreshTrigger]);

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8000/api/courses/${courseId}/`);
      setCourses(courses.filter((course) => course.id !== courseId));
      alert("Course deleted successfully");
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <button
          className={styles.headingButton}
          onClick={() => {
            setShowAllCourse(!showAllCourse);
          }}
        >
          {showAllCourse ? "Hide Courses" : "List Courses"}
        </button>
      </div>
      {showAllCourse && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Course Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.course_code}</td>
                <td>
                  <div className={styles.deleteButton}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={styles.icon}
                      onClick={() => handleDelete(course.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CourseList;
