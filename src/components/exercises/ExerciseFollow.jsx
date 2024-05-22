import { useState, useEffect } from "react";
import axios from "axios";

const ExerciseFollow = ({exercise}) => {
    const [getFollowExercise, setGetFollowExercise] = useState();

    const fetchFollowExercise = async () => {
        try {
            const res = await axios.get('http://localhost:8000/v1/exercise/favorite');
            setGetFollowExercise(res.data);
        } catch (error) {
            console.error('Failed to fetch followed exercises:', error);
        }
    };

    const followExercise = async (id) => {
        try {
            const res = await axios.post('http://localhost:8000/v1/exercise/favorite', { id });
            alert(res.data.message);
            fetchFollowExercise(); // Followed exercises를 다시 가져옵니다.
        } catch (error) {
            console.error('Failed to follow exercise:', error);
        }
    };

    useEffect(() => {
        fetchFollowExercise(); // 컴포넌트가 마운트될 때 Followed exercises를 가져옵니다.
    }, []);

    followExercise();
}

export default ExerciseFollow