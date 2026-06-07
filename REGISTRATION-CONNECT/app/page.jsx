"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {

const router = useRouter();

const [loading, setLoading] = useState(false);

const [form, setForm] = useState({

name: "",

email: "",

gender: "",

denomination: "",

health: "",

expectation: "",

});

const handleChange = (e) => {

setForm({

...form,

[e.target.name]: e.target.value,

});

};

const handleSubmit = async (e) => {

e.preventDefault();

if (

!form.name ||

!form.email ||

!form.gender ||

!form.denomination ||

!form.expectation

) {

alert("Please complete all required fields.");

return;

}

setLoading(true);

try {

const fullData = {

name: form.name,

email: form.email,

gender: form.gender,

denomination: form.denomination,

health: form.health,

expectations: form.expectation,

};

const response = await fetch(
"/api/register",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(fullData)
}
);

const result = await response.json();

if(!result.success){

throw new Error(
result.error || "Registration failed"
);

}

router.push(

`/confirmation?

name=${encodeURIComponent(form.name)}

&email=${encodeURIComponent(form.email)}

&gender=${encodeURIComponent(form.gender)}

&denomination=${encodeURIComponent(form.denomination)}

&health=${encodeURIComponent(form.health)}

&expectation=${encodeURIComponent(form.expectation)}

&tribe=${encodeURIComponent(result.tribe)}

&code=${encodeURIComponent(result.code)}`

);
}

catch (error) {

console.error(error);

alert(

error.message ||

"Registration failed"

);

}

finally {

setLoading(false);

}

};

return (

<main className="page-container">

<div className="hero-card">

<img

src="/logo.png"

alt="The Connect"

className="logo"

/>

<p className="retreat-text">

Ministers and Workers Retreat 2026

</p>

<h1 className="call-title">

THE CALL

</h1>

<p className="scripture">

"But they that wait upon the Lord shall renew their strength..."

</p>

<div className="green-line"></div>

<p className="description">

To lead ministers and workers into a season of waiting on the Lord,

renewal and preparation for greater impact.

</p>

</div>

<div className="form-card">

<h2>

Registration Form

</h2>

<p className="subtitle">

Register for the retreat

</p>

<form onSubmit={handleSubmit}>

<input

name="name"

placeholder="Full name"

value={form.name}

onChange={handleChange}

required

/>

<input

name="email"

type="email"

placeholder="Email address"

value={form.email}

onChange={handleChange}

required

/>

<select

name="denomination"

value={form.denomination}

onChange={handleChange}

required

>

<option value="">

Select denomination

</option>

<option>RCCG</option>

<option>Living Faith</option>

<option>Deeper Life</option>

<option>Christ Embassy</option>

<option>MFM</option>

<option>CAC</option>

<option>Anglican</option>

<option>Baptist</option>

<option>Assemblies of God</option>

<option>Catholic</option>

<option>Foursquare</option>

<option>Other</option>

</select>

<select

name="gender"

value={form.gender}

onChange={handleChange}

required

>

<option value="">

Select gender

</option>

<option>Male</option>

<option>Female</option>

</select>

<textarea

name="health"

placeholder="Any health issues?"

value={form.health}

onChange={handleChange}

/>

<textarea

name="expectation"

placeholder="What are your expectations for the retreat?"

value={form.expectation}

onChange={handleChange}

required

/>

<button

type="submit"

className="submit-btn"

disabled={loading}

>

{

loading

?

"Submitting..."

:

"Complete Registration"

}

</button>

</form>

</div>

</main>

);

}