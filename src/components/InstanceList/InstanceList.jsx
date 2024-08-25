import React, { useState } from "react";
import axios from "axios";
import styles from "./InstanceList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import config from "../../../config";
function InstanceList() {
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [instances, setInstances] = useState([]);

  const semesters = [1, 2];

  const handleListInstances = async () => {
    if (!year || !semester) {
      alert("Please select both year and semester");
      return;
    }

    try {
      const response = await axios.get(
        `${config.apiUrl}/instances/${year}/${semester}/`
      );
      console.log("instanceList:", response);
      setInstances(response.data);
    } catch (error) {
      console.error("Error fetching instances:", error);
      alert("Failed to load course instances");
    }
  };

  const handleDelete = async (instanceId, yr, sm) => {
    console.log("InsitanceID :", instanceId);
    try {
      await axios.delete(
        `${config.apiUrl}/instances/${yr}/${sm}/${instanceId}/`
      );
      setInstances(instances.filter((instance) => instance.id !== instanceId));
      alert("Course instance deleted successfully");
    } catch (error) {
      console.error("Error deleting instance:", error);
      alert("Failed to delete course instance");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Course Instances</h2>

      <div className={styles.formGroupContainer}>
        <div className={styles.formGroup}>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={styles.input}
            placeholder="YYYY"
          />
        </div>

        <div className={styles.formGroup}>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className={styles.select}
          >
            <option value="">-- Select Semester --</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleListInstances} className={styles.button}>
          List Instances
        </button>
      </div>

      {instances.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Year - Semester</th>
              <th>Course Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {instances.map((instance) => (
              <tr key={instance.id}>
                <td>{instance.course_title}</td>
                <td>
                  {instance.year} - {instance.semester}
                </td>
                <td>{instance.course_code}</td>
                <td>
                  <div className={styles.deleteButton}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={styles.icon}
                      onClick={() =>
                        handleDelete(
                          instance.id,
                          instance.year,
                          instance.semester
                        )
                      }
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

export default InstanceList;
