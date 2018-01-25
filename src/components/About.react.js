import React from 'react'

const About = () => (
  <div className="about-content">
    <h2>What's this all about?
    </h2>
    <p>My kid wanted to do some word searches. It was tough looking around for good ones online so I figured I'd make a generator to make some for him. Then I figured I could put it online. And while I was there I might as well add some database connection so that word searches could be saved.
    </p>
    <p>And here we are!</p>
    <p>OK, while you're here, here's a quick explanation of how this works.</p>
    <p>1. You add a list of names, phrases, or whatever.</p>
    <p>2. That gets processed so that empty lines and duplicates are tossed out. The lines left over are converted into uppercase.</p>
    <p>3.These are sorted by size, with the biggest words first.</p>
    <p>4. A blank grid is made that is 2 characters wider and taller than the longest word.</p>
    <p>5. A list of possibilities is made of all of the places the word could fit into the grid, with all different directions.</p>
    <p>6. This list is filtered by whether that position collides with any other word already in the grid.</p>
    <p>7. One of those remaining positions is randomly selected and the grid is modified.</p>
    <p>8. Repeat steps 5-7 for the rest of the words.</p>
    <p>9. If the words don't all fit, the grid increases in size and cleared out and it's back to step 5 again.</p>
    <p>I should do this again with pictures sometime.</p>
    <p>-Ed</p>
  </div>
)

export default About
