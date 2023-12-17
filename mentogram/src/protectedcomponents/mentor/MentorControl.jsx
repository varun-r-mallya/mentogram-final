export default function MentorControl(props){
    return(
        <div>
        <h1>Mentor Control</h1>
        <button onClick={props.signout}>Sign Out</button>
        </div>
    );
}