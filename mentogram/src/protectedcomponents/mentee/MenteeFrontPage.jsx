export default function MenteeFrontPage(props) {
    return (
        <div>
        <h1>Mentee Front Page</h1>
        <button onClick={props.signout}>Sign Out</button>
        </div>
    );
}