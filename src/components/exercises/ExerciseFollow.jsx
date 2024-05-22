import { useState, useEffect } from "react";
import axios from "axios";

const ExerciseFollow = ({favExercise}) => {
    console.log(favExercise);
    return (
        <div>
            {favExercise.name}
        </div>
    )
}

export default ExerciseFollow