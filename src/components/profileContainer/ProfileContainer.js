import './style.css'
export default function ProfileContainer({ user }) {
    console.log(user);
    return (
        <div className="container">
            <div className='photo'><img src={user.avatar} alt="" /></div>
            <div className='info'>
                <p>First Name:  {user.first_name}</p>
                <p>Last Name:   {user.last_name}</p>
                <p>Email:   {user.email}</p>
            </div>
        </div>
    )
}