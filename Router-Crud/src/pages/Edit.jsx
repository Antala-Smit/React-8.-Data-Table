import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header';
import './Add.css';

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [course, setCourse] = useState([]);
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  let data = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : [];
  const [record, setRecord] = useState(data)

  useEffect(()=>{
    setFirstName(location.state.firstname)
    setLastName(location.state.lastname)
    setEmail(location.state.email)
    setPhone(location.state.phone)
    setCity(location.state.city)
    setCourse(location.state.course)
    setGender(location.state.gender)
    setStatus(location.state.status)
    setDate(location.state.date)
  },[location.state])



  const handleCourseChange = (courses, checked) => {
    let all = [...course];
    if (checked) {
      all.push(courses);
    } else {
      all = all.filter(val => val !== courses);
    }
    setCourse(all);
  };

  let courses = ["HTML", "CSS", "BootStrap", "C#", "JS", "React Js", "Node Js", "PHP", "Angular", "Python", "Laravel", "Go", "Ruby", "Java", ".NET", "Perl", "Swift", "Kotlin"];

  const handleSubmit = (e) => {
    e.preventDefault();
    let up = record.map((val) => {
      if (val.id == location.state.id) {
        val.firstname = firstname;
        val.lastname = lastname;
        val.email = email;
        val.phone = phone;
        val.gender = gender;
        val.course = course;
        val.date = date;
        val.status = status
      }
      return val;
    })

    localStorage.setItem('users',JSON.stringify(up))
    
    setTimeout(() => {
      navigate('/')
    }, [])
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mx-auto">
            <div className="add">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="form-row">
                    <div className="col-4">
                      <label htmlFor="firstname" className="form-label">First Name</label>
                      <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstname} className="form-control" placeholder='Enter Your First Name' />
                    </div>
                    <div className="col-4">
                      <label htmlFor="lastname" className="form-label">Last Name</label>
                      <input type="text" onChange={(e) => setLastName(e.target.value)} value={lastname} className="form-control" placeholder='Enter Your Last Name' />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col-4">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder='Enter Your Email Address' />
                    </div>
                    <div className="col-4">
                      <label htmlFor="city" className="form-label">City</label>
                      <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className="form-control" placeholder='Enter Your City' />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col-4">
                      <label htmlFor="course" className="form-label">Course</label>
                      <div>
                        {courses.map((c, index) => (
                          <div key={index} className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" checked={course.includes(c)} onChange={(e) => handleCourseChange(c, e.target.checked)} />
                            <label className="form-check-label" htmlFor={`inlineCheckbox${index}`}>{c}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-2">
                      <label htmlFor="number" className="form-label">Phone Number</label>
                      <input type="number" onChange={(e) => setPhone(e.target.value)} value={phone} className="form-control" />

                      <label htmlFor="date" className="form-label">Date of Birth</label>
                      <input type="date" onChange={(e) => setDate(e.target.value)} value={date} className="form-control" />
                    </div>

                  </div>

                  <div className="form-row">
                    <div className="col-4">
                      <label htmlFor="gender" className="form-label">Gender</label>
                      <div className="form-check">
                        <input className="form-check-input" value="male" onChange={(e) => setGender(e.target.value)} type="radio" checked={gender === "male"} name="flexRadioDefault" />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                          Male
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" value="female" onChange={(e) => setGender(e.target.value)} name="flexRadioDefault" checked={gender === "female"} />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                          Female
                        </label>
                      </div>
                    </div>
                    <div className="col-3">
                      <label htmlFor="status" className="form-label">Select Job Status</label>
                      <select name="status" onChange={(e) => setStatus(e.target.value)} value={status} className="form-control">
                        <option value="select">---Select Status---</option>
                        <option value="active">Active</option>
                        <option value="Deactive">Deactive</option>
                      </select>
                    </div>
                  </div>

                  <div className='button-container'>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
