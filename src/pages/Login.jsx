import { useState } from "react";
import axios from "../lib/axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/login.css";
import "../styles/checkout.css"
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const Login = () => {
    const { currentColor, setLogin } = useStateContext();
    const navigate = useNavigate();
    const [emailLog, setEmailLog] = useState("");
    const [passLog, setPassLog] = useState("");
    const [emailLogErr, setEmailLogErr] = useState(false);
    const [passLogErr, setPassLogErr] = useState(false);

    const notifyError = (msg) => toast.error(msg);
    const notifySuccess = (msg) => toast.success(msg);


    const handleLogin = async () => {
        if (emailLog === "") {
            setEmailLogErr(true);
        }
        if (passLog === "") {
            setPassLogErr(true);
        }
        if (emailLogErr || passLogErr) return false;
        try {
            const res = await axios.post("/users/admin-signin", {
                email: emailLog,
                password: passLog,
            });
            localStorage.setItem("admin", JSON.stringify(res.data.user));
            notifySuccess("Đăng nhập thành công");

            setTimeout(() => {
                setLogin(true)
                navigate("/");
            }, 3000);
        } catch (error) {
            console.log(error);
            notifyError(error.response.data.msg);
        }
    };

    return (
        <>
            <ToastContainer />
            <div>
                <link
                    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
                    rel="stylesheet"
                />
                <div className="container pb-5 mb-sm-4">
                    <div className="row pt-5">
                        <div className="col-md-6 pt-sm-3">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="h4 mb-1">Đăng Nhập</h2>
                                    <div className="d-sm-flex align-items-center py-3">
                                        <h3 className="h6 font-weight-semibold opacity-70 mb-3 mb-sm-2 mr-sm-3">
                                            Đăng nhập bằng:
                                        </h3>
                                        <div>
                                            <a
                                                className="social-btn sb-facebook mr-2 mb-2"
                                                href="#"
                                                data-toggle="tooltip"
                                                title
                                                data-original-title="Sign in with Facebook"
                                            >
                                                <i className="fa fa-facebook" />
                                            </a>
                                            <a
                                                className="social-btn sb-twitter mr-2 mb-2"
                                                href="#"
                                                data-toggle="tooltip"
                                                title
                                                data-original-title="Sign in with Twitter"
                                            >
                                                <i className="fa fa-twitter" />
                                            </a>
                                            <a
                                                className="social-btn sb-linkedin mr-2 mb-2"
                                                href="#"
                                                data-toggle="tooltip"
                                                title
                                                data-original-title="Sign in with LinkedIn"
                                            >
                                                <i className="fa fa-linkedin" />
                                            </a>
                                        </div>
                                    </div>
                                    <hr />
                                    <h3 className="h6 font-weight-semibold opacity-70 pt-4 pb-2">
                                        Hoặc sử dụng mẫu dưới đây
                                    </h3>
                                    <form className="needs-validation" noValidate>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-mail"
                                                    >
                                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                                        <polyline points="22,6 12,13 2,6" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <input
                                                className="form-control"
                                                type="email"
                                                placeholder="Email"
                                                required
                                                value={emailLog}
                                                onChange={(e) => {
                                                    setEmailLog(e.target.value);
                                                    if (e.target.value === "")
                                                        return setEmailLogErr(true);
                                                    setEmailLogErr(false);
                                                }}
                                            />
                                            {emailLogErr && (
                                                <div className="invalid-feedback">
                                                    Vui lòng nhập email
                                                </div>
                                            )}
                                        </div>
                                        <div className="input-group form-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="feather feather-lock"
                                                    >
                                                        <rect
                                                            x={3}
                                                            y={11}
                                                            width={18}
                                                            height={11}
                                                            rx={2}
                                                            ry={2}
                                                        />
                                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <input
                                                className="form-control"
                                                type="password"
                                                placeholder="Password"
                                                required
                                                value={passLog}
                                                onChange={(e) => {
                                                    setPassLog(e.target.value);
                                                    if (e.target.value === "")
                                                        return setPassLogErr(true);
                                                    setPassLogErr(false);
                                                }}
                                            />
                                            {passLogErr && (
                                                <div className="invalid-feedback">
                                                    Please enter valid password!
                                                </div>
                                            )}
                                        </div>

                                        <div className="d-flex flex-wrap justify-content-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    className="custom-control-input"
                                                    type="checkbox"
                                                    defaultChecked
                                                    id="remember_me"
                                                />
                                                <label
                                                    className="custom-control-label"
                                                    htmlFor="remember_me"
                                                >
                                                    Nhớ Mật Khẩu
                                                </label>
                                            </div>
                                            <a
                                                className="nav-link-inline font-size-sm"
                                                href="account-password-recovery.html"
                                            >
                                                Quên Mật Khẩu
                                            </a>
                                        </div>
                                        <hr className="mt-4" />
                                        <div className="text-right pt-4">
                                            <button
                                                className="btn btn-primary"
                                                type="button"
                                                onClick={handleLogin}
                                            >
                                                Đăng Nhập
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
};

export default Login;
