import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "../not-found/NotFound";
import List from "../../movies/list/List";
import New from "../../movies/new/New";

export default function Main() {
    return (
        <Routes>
            {/* <Route path="/" element={<Profile />} /> */}
            <Route path="/" element={<Navigate to="/movies" />} />
            <Route path="/movies" element={<List />} />
            <Route path="/new-movie" element={<New />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
