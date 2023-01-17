import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { useState } from "react";
import "./Home.css";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Forms = () => {
  const [form] = Form.useForm();
  const [signupData, setSignupData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const updateHandleChange = (event) => {
    setSignupData({
      ...signupData,
      [event.target.name]: event.target.value,
    });
  };
  //   const onFinish = (values) => {
  //     console.log("Received values of form: ", values);
  const onFinish = async (e) => {
    e.preventDefault();
    // setLoading(true);
    // setErrors(Validation(signupData));
    // setDataIsCorrect(true);
  };
  //   const name = e.target[0].value;
  //   const mobile = e.target[1].value;
  //   const email = e.target[2].value;
  //   const password = e.target[3].value;

  //   try {
  //     const res = await createUserWithEmailAndPassword(auth, email, password);
  //     console.log(res);
  //     navigate("/");
  //   } catch (err) {
  //     console.log(err);
  //     setErr(true);
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   if (Object.keys(errors).length === 0 && dataIsCorrect) {
  //     alert("signup successfully");

  //     // navigate("/eventslist");
  //   }
  // }, [errors]);
  //   };

  return (
    <div>
      <h1 className="signup-head">Sign Up</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Name"
          value={signupData.name}
          onChange={updateHandleChange}
          tooltip="What is your Name?"
          rules={[
            {
              required: true,
              message: "Please enter your Name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="mobile"
          label="Mobile Number"
          value={signupData.mobile}
          onChange={updateHandleChange}
          rules={[
            {
              required: true,
              message: "Please enter your Mobile Number!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          value={signupData.email}
          onChange={updateHandleChange}
          rules={[
            {
              type: "email",
              message: "The Email is not valid !",
            },
            {
              required: true,
              message: "Please enter your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          value={signupData.password}
          onChange={updateHandleChange}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item> */}

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Forms;
