import React, { useState, useEffect } from "react";

function Section({ name, items, onAddItem, onRemoveItem }) {
  const [inputText, setInputText] = useState("");

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const addItem = () => {
    if (inputText.trim() !== "") {
      onAddItem(inputText);
      setInputText("");
    }
  };

  const removeItem = (itemIndex) => {
    onRemoveItem(itemIndex);
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #ddd",
        borderRadius: "10px",
        marginBottom: "20px"
      }}
    >
      <h2 style={{ fontSize: "24px", margin: "0" }}>{name}</h2>
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <input
          type="text"
          value={inputText}
          onChange={handleChange}
          placeholder={`Add item to ${name}`}
          style={{
            flex: "1",
            padding: "8px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "2px solid #ddd"
          }}
        />
        <button
          onClick={addItem}
          style={{
            padding: "8px 15px",
            borderRadius: "5px",
            backgroundColor: "#ffd500",
            border: "none",
            cursor: "pointer"
          }}
        >
          Add
        </button>
      </div>
      <ul>
        {items.map((item, itemIndex) => (
          <li
            key={itemIndex}
            style={{
              margin: "10px 0",
              position: "relative",
              padding: "5px 0 5px 25px",
              borderBottom: "1px solid #ddd",
              listStyle: "none",
              fontSize: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {item}
            <button
              onClick={() => removeItem(itemIndex)}
              style={{
                backgroundColor: "#ff6347",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState(0);

  // Load data from local storage when the component mounts
  useEffect(() => {
    const storedSections = JSON.parse(localStorage.getItem("sections"));
    if (storedSections) {
      setSections(storedSections);
    }
  }, []);

  // Save data to local storage whenever sections change
  useEffect(() => {
    localStorage.setItem("sections", JSON.stringify(sections));
  }, [sections]);

  const addItemToSection = (sectionIndex, newItem) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].items.push(newItem);
    setSections(updatedSections);
  };

  const removeItemFromSection = (sectionIndex, itemIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].items.splice(itemIndex, 1);
    setSections(updatedSections);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#ffeaa7",
        minHeight: "70vh",
        padding: "1rem",
        boxSizing: "border-box",
        color: "hsl(198, 1%, 29%)",
        fontFamily: "Architects Daughter, cursive",
        textAlign: "center",
        fontSize: "130%",
      }}
    >
      <div
        className="heading"
        style={{
          backgroundColor: "#ffeaa7",
          padding: "1rem",
          boxSizing: "border-box",
          color: "hsl(198, 1%, 29%)",
          fontFamily: "Architects Daughter, cursive",
          textAlign: "center",
          fontSize: "130%",
        }}
      >
        <h1
          style={{
            transform: "rotate(2deg)",
            padding: "0.2rem 1.2rem",
            borderRadius: "20% 5% 20% 5%/5% 20% 25% 20%",
            backgroundColor: "#fdcb6e",
            fontSize: "1.5rem",
            margin: "0",
          }}
        >
          To-Do List
        </h1>
      </div>
      <div style={{ display: "flex", margin: "10px 0" }}>
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => setActiveSection(index)}
            style={{
              backgroundColor: "#ffd500",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              marginRight: "10px",
              fontSize: "18px",
            }}
          >
            {section.name}
          </button>
        ))}
      </div>
      <div className="content">
        <Section
          name={sections[activeSection]?.name || ""}
          items={sections[activeSection]?.items || []}
          onAddItem={(newItem) => addItemToSection(activeSection, newItem)}
          onRemoveItem={(itemIndex) => removeItemFromSection(activeSection, itemIndex)}
        />
      </div>
    </div>
  );
}

export default App;
