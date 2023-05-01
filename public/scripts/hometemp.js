<i>
  <input
    checked
    type="radio"
    name="s"
    style="background-image: url(../../public/assets/mango.jpg)"
    title="Random Picture 1"
  />
  <input
    type="radio"
    name="s"
    style="background-image: url('https://picsum.photos/500/300?random=2')"
    title="Random Picture 2"
  />
  <input
    type="radio"
    name="s"
    style="background-image: url('https://picsum.photos/500/300?random=3')"
    title="Random Picture 3"
  />
  <input
    type="radio"
    name="s"
    style="background-image: url('https://picsum.photos/500/300?random=4')"
    title="Random Picture 4"
  />
  <input
    type="radio"
    name="s"
    style="background-image: url('https://picsum.photos/500/300?random=5')"
    title="Random Picture 5"
  />
</i>;




i {
  position: relative;
  display: block;
  width: 50rem;
  height: 25rem;
  overflow: hidden;
  border-radius: 5px;
  margin-left: 23rem;
  margin-top: 75px;
  border-bottom-left-radius: 3cm;
  border: 1mm;
  border-style: outset;
}

i:before,
i:after {
  content: "⥪";
  position: absolute;
  top: 50%;
  left: 1rem;
  z-index: 4;
  width: 2rem;
  height: 2rem;
  background: rgb(11, 20, 29);
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

i:after {
  content: "⥭";
  left: auto;
  right: 1rem;
}

/* I haven't found a way for IE and Edge to let me style inputs that way */
input {
  appearance: none;
  -ms-appearance: none;
  -webkit-appearance: none;
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transform: translateX(100%);
  transition: transform ease-in-out 400ms;
  z-index: 1;
}

input:focus {
  outline: none;
}

input:after {
  content: attr(title);
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
}

input:not(checked):before {
  content: "";
  position: absolute;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  top: 50%;
  left: calc(-100% + 1rem);
}

input:checked:before {
  display: none;
  left: 1rem;
}

input:checked {
  transform: translateX(0);
  z-index: 0;
  box-shadow: -5px 10px 20px -15px rgba(0, 0, 0, 1);
}

input:checked + input:before {
  left: -3rem;
}

input:checked + input ~ input:before {
  display: none;
}
