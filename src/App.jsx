import React, { useState } from "react";

import CreateCourse from "../src/components/CreateCourse/CreateCourse";
import CreateInstance from "../src/components/CreateInstance/CreateInstance";

import "./App.css";
import CourseList from "../src/components/CourseList/CourseList";
import InstanceList from "../src/components/InstanceList/InstanceList";

function App() {
  const [refreshCourses, setRefreshCourses] = useState(false);

  const triggerCourseListRefresh = () => {
    setRefreshCourses((prev) => !prev);
  };
  return (
    <div className="container">
      <div className="AppContainer">
        <CreateCourse onCourseCreated={triggerCourseListRefresh} />
        <CreateInstance refreshTrigger={refreshCourses} />
      </div>
      <div className="line1"></div>
      <div className="listContainer">
        <CourseList refreshTrigger={refreshCourses} />
        <div className="line2"></div>
        <InstanceList />
      </div>
    </div>
  );
}

export default App;
