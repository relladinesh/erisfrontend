import React, { useEffect } from 'react';

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText, isButtondis }) {
  // User ID for tracking or personalization
  const currentUserID = 'dinesh6305';
  const currentDate = '2025-05-29 13:57:26'; // Keeping the provided UTC date/time
  
  // Initialize select elements with first option values on component mount
  useEffect(() => {
    const updatedFormData = { ...formData };
    let dataChanged = false;

    formControls.forEach(control => {
      // Only handle select elements that don't already have a value
      if (control.componentType === 'select' && 
          control.options?.length > 0 && 
          (formData[control.name] === undefined || formData[control.name] === "")) {
        // Set first option as default value
        updatedFormData[control.name] = control.options[0].id || control.options[0].value;
        dataChanged = true;
      }
    });

    // Only update state if changes were made
    if (dataChanged) {
      setFormData(updatedFormData);
    }
  }, [formControls]); // Depend on formControls to run when they change
  
  function renderInputsByComponentType(getControlItem) {
    const value = formData[getControlItem.name] ?? ""; // Proper handling of undefined values
    let element = null;

    // Common styles for all form elements - white background and block display
    const commonStyles = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700 bg-white text-black block";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <input
            className={commonStyles}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={`${getControlItem.name}-${currentUserID}`}
            type={getControlItem.type || "text"} // Default type if not provided
            value={value}
            onChange={(event) => setFormData({ ...formData, [getControlItem.name]: event.target.value })}
            data-user={currentUserID}
            data-timestamp={currentDate}
          />
        );
        break;

      case "select":
        element = (
          <select
            className={commonStyles}
            name={getControlItem.name}
            value={value}
            id={`${getControlItem.name}-${currentUserID}`}
            onChange={(event) => setFormData({ ...formData, [getControlItem.name]: event.target.value })}
            data-user={currentUserID}
            data-timestamp={currentDate}
          >
            <option value="" disabled>{getControlItem.placeholder}</option>
            {getControlItem.options?.map((optionItem) => (
              <option 
                key={`${optionItem.id || optionItem.value}-${currentUserID}`} 
                value={optionItem.id || optionItem.value}
              >
                {optionItem.label}
              </option>
            ))}
          </select>
        );
        break;

      case "textarea":
        element = (
          <textarea
            className={commonStyles}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={`${getControlItem.name}-${currentUserID}`}
            value={value}
            onChange={(event) => setFormData({ ...formData, [getControlItem.name]: event.target.value })}
            data-user={currentUserID}
            data-timestamp={currentDate}
          />
        );
        break;

      default:
        element = (
          <input
            className={commonStyles}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={`${getControlItem.name}-${currentUserID}`}
            type={getControlItem.type || "text"}
            value={value}
            onChange={(event) => setFormData({ ...formData, [getControlItem.name]: event.target.value })}
            data-user={currentUserID}
            data-timestamp={currentDate}
          />
        );
    }
    return element;
  }

  return (
    <form 
      onSubmit={onSubmit}
      className="space-y-4 block"
      data-user-id={currentUserID}
      data-timestamp={currentDate}
    >
      <div className="flex flex-col gap-3 ">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5 " key={`${controlItem.name}-${currentUserID}`}>
            <label className="mb-1 font-medium block" htmlFor={`${controlItem.name}-${currentUserID}`}>
              {controlItem.label}
            </label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <button
        disabled={isButtondis}
        type="submit"
        className={`mt-2 w-full py-2 rounded-md transition block ${
          isButtondis ? "bg-gray-400 cursor-not-allowed text-white" : "bg-purple-700 hover:bg-purple-800 text-white"
        }`}
        data-submitted-by={currentUserID}
        data-timestamp={currentDate}
      >
        {buttonText || "Submit"}
      </button>
      <input type="hidden" name="submitted_by" value={currentUserID} />
      <input type="hidden" name="submission_time" value={currentDate} />
    </form>
  );
}

export default CommonForm;