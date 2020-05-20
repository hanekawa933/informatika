import { Provider } from "react-redux";
import Store from "../store";
import { loadUser } from "../actions/auth";
import setAuthToken from "../utils/setAuthToken";
export { Provider, Store, loadUser, setAuthToken };
