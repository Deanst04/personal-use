import { Navigate, Route, Routes } from "react-router-dom";
import List from "../../books/list/List";
import New from "../../books/new/New";
import NotFound from "../not-found/NotFound";

export default function Main() {
    return (
        <Routes>
            {/* <Route path="/" element={<Profile />} /> */}
            <Route path="/" element={<Navigate to="/books" />} />
            <Route path="/books" element={<List />} />
            <Route path="/new-book" element={<New />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
