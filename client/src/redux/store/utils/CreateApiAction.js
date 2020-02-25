import history from "../../../helpers/history";
import api from "../../../connect/api";


const createApiAction = (data, actions, apiRequest, type='', helpers=null, path='') => {
    const request = new (apiRequest(data,type))();
    return (dispatch) => {
        if(helpers)
            dispatch(helpers());
        dispatch(actions.start());
        (request)
            .fire()
            .then((res) => {
                if(res.data.success) {
                    if(path)
                        history.push(path);
                    if(res.data.data.token)
                        api.setHeader(res.data.data.token).then(
                            dispatch(actions.success(res.data))
                        );
                    dispatch(actions.success(res.data));
                } else
                    dispatch(actions.failure(res.data.error))
            })
            .catch((err) => {
                const error = (err.message==="Network Error") ? "Network connection failed" : err.message;
                dispatch(actions.failure({message: error}));
            });
    };
};

export default createApiAction;