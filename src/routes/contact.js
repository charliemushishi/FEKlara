import { Form } from "react-router-dom";

export default function Contact() {
const contact = {
first: "Your",
last: "Name",
avatar: "https://placekitten.com/g/200/200",
twitter: "your_handle",
notes: "Some notes",
favorite: true,
};

return (
    <div id="contact">
        <div>
        <h1>
            {contact.first || contact.last ? (
            <>
                {contact.first} {contact.last}
            </>
            ) : (
            <i>No Name</i>
            )}{" "}
            <Favorite contact={contact} />
        </h1>

        {contact.notes && <p>{contact.notes}</p>}

        <div>
            <Form action="edit">

            </Form>
        </div>
        </div>
    </div>
    );
    }

    function Favorite({ contact }) {
    // yes, this is a `let` for later
    let favorite = contact.favorite;
    return (
    <Form method="post">
        <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
            favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
        >
        {favorite ? "★" : "☆"}
        </button>
    </Form>
);
}