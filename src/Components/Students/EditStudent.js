import React from "react";

const EditStudent = () => {
    return (
        <div className="container m-t-20">
            <h1 className="page-title">New Student</h1>

            <div className="newnote-page m-t-20">
                <form>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Name" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input" type="email" placeholder="Email" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Phone</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Phone" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Date of Birth</label>
                        <div className="control">
                            <input className="input" type="datetime-local" placeholder="Date of Birth" />
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditStudent;