import { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import Loder from '../components/Loder'
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../redux/slices/api/authApiSlice';
import { toast } from 'sonner';
import { setCredentials } from '../redux/slices/authSlice';




const Login = () => {
    const { user } = useSelector((state) => state.auth);
    // const user = true;

    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();


    const submitHandler = async (data) => {

        try {
            const result = await login(data);

            if (result.error) {
                toast.error(result.error.data.message || "An error occurred while logging in");
            } else {
                dispatch(setCredentials(result));
                navigate('/dashboard');
                window.location.reload()
            }

        } catch (error) {
            console.error(error);
            toast.error("An error occurred while logging in");
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    return (
        <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]' >
            <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col lg:flex-row items-center justify-center'>
                {/* left side  */}
                <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
                    <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
                        <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600'>Manage all task in one palce</span>
                        <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text--6xl 2xl:text-7xl font-black text-center text-sky-500 '>
                            <span>Cloud Based </span>
                            <span>Task Manager </span>
                            <span className='text-red-500'>SwiftTasker </span>
                        </p>

                        <div className='cell'>
                            <div className='circel rotate-in-up-left'></div>
                        </div>

                    </div>
                </div>

                {/* right side  form */}
                <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
                    <form onSubmit={handleSubmit(submitHandler)}
                        className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-sky-50 px-10 pt-14 pb-14'
                    >
                        <div className=''>
                            <p className='text-sky-600 text-3xl font-bold text-center'>Welcome Board</p>
                        </div>
                        {/* সুইফটাস্কারে আপনাকে স্বাগতম  🙏 */}
                        <div className='flex flex-col gap-y-5'>
                            <Textbox
                                placeholder="আপনার ইমেল আইডি লিখুন"
                                type='email'
                                name='email'
                                label="ইমেল আইডি "
                                className='w-full rounded-full'
                                register={register("email", {
                                    required: "Email address is required!",
                                })}
                                error={errors.email ? errors.email.message : " "}
                            />

                            <Textbox
                                placeholder="আপনার গুপ্তমন্ত্র লিখুন"
                                type='password'
                                name='password'
                                label="গুপ্তমন্ত্র"
                                className='w-full rounded-full'
                                register={register("password", {
                                    required: "password  required!",
                                })}
                                error={errors.password ? errors.password.message : " "}
                            />

                            <span className='text-sm text-grey-500 hover:text-blue-600 hover:underline cursor-pointer'>আপনার পাসওয়ার্ড ভুলে গেছেন?</span>

                            {isLoading ? <Loder /> :
                                <Button
                                    type='submit'
                                    label='জমা দিন'
                                    className='w-full h-10 bg-sky-500 text-white rounded-full hover:bg-sky-700'
                                />}
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login
