import "./styles.css";
import * as React from "react";
import { nanoid } from "nanoid";

const DynamicSelect = () => {
  // const [count, setCount] = React.useState(0);
  // const [selectedItemList, setSelectedItemList] = React.useState([]);
  // const [currentSelectValue, setCurrentSelectValue] = React.useState();

  // const optionsList = React.useMemo(() => {
  //   return ["item1", "item2", "item3", "item4", "item5"];
  // }, []);
  // const renderDropdown = React.useMemo(() => {
  //   let list = [];
  //   let newOptionsList = optionsList.filter((option) => {
  //     return !selectedItemList?.includes(option);
  //   });
  //   const onDelete = (index) => {
  //     list.splice(0, index);
  //     console.clear();
  //     console.log(list);
  //   };
  //   for (let i = 0; i <= count; i++) {
  //     list.push(
  //       <div key={i}>
  //         <div>
  //           <div>
  //             <label>label</label>
  //             <select
  //               value={selectedItemList[i]}
  //               onChange={(e) => {
  //                 setCurrentSelectValue(e.target.value);
  //               }}
  //               editable={i < count}
  //             >
  //               {i < count ? (
  //                 <option key={selectedItemList[i]} value={selectedItemList[i]}>
  //                   {selectedItemList[i]}
  //                 </option>
  //               ) : (
  //                 newOptionsList.map((option, key) => {
  //                   return (
  //                     <option key={option + key} value={option}>
  //                       {option}
  //                     </option>
  //                   );
  //                 })
  //               )}
  //             </select>
  //             <input type="text" placeholder="enter some value here" />
  //             <button onClick={() => onDelete(i)}>Delete</button>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }
  //   console.log(list);
  //   return list;
  // }, [count, setCurrentSelectValue, selectedItemList, optionsList]);

  // const handleNew = (e) => {
  //   if (currentSelectValue) {
  //     setSelectedItemList((selecteds) => selecteds.concat(currentSelectValue));
  //     setCurrentSelectValue(null);
  //     setCount(count + 1);
  //   }
  // };

  const optionsList = React.useMemo(() => {
    return [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  }, []);
  // NEW WAY CRUD

  const initialState = React.useMemo(() => {
    return {
      id: nanoid(4),
      editable: false,
      inputValue: "",
      selectedValue: ""
    };
  }, []);
  const [state, setState] = React.useState([initialState]);

  // FOR ADD ITEM FROM ARRAY
  const onAddNew = React.useCallback(() => {
    const draft = [...state];
    draft.push({
      id: nanoid(4),
      editable: false,
      inputValue: "",
      selectedValue: ""
    });
    setState(draft);
  }, []);
  // FOR DELETE ITEM FROM ARRAY
  const onDeleteExisting = React.useCallback((uuid) => {
    setState((state) => state.filter((data) => data.id !== uuid));
  }, []);

  // FOR CHANGE STATE BASED ITEM INDEX FROM ARRAY
  const onChangeState = React.useCallback(
    (index, key, value) => {
      const draft = [...state];
      draft[index][key] = value;
      setState(draft);
    },
    [state]
  );

  return (
    <div>
      <div>
        {state.map((item, index) => {
          return (
            <div key={index}>
              <label>Days</label>
              <select
                onChange={async ({ target }) =>
                  onChangeState(index, "selectedValue", target.value)
                }
                disabled={item.editable}
                value={item.selectedValue}
              >
                {optionsList.map((content, index) => {
                  return (
                    <option key={index} value={content}>
                      {content}
                    </option>
                  );
                })}
              </select>
              <input
                type="text"
                value={item.inputValue}
                placeholder="enter some value here"
                onChange={({ target }) =>
                  onChangeState(index, "inputValue", target.value)
                }
                disabled={item.editable}
              />
              <button
                onClick={() => {
                  if (item.inputValue && item.selectedValue) {
                    onChangeState(index, "editable", false);
                  } else {
                    alert("Add Value");
                  }
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (item.inputValue && item.selectedValue) {
                    onChangeState(index, "editable", true);
                  } else {
                    alert("Add Value");
                  }
                }}
              >
                Save
              </button>
              <button onClick={() => onDeleteExisting(item.id)}>Delete</button>
            </div>
          );
        })}
        <div>
          <button onClick={onAddNew}>Add New</button>
        </div>
      </div>
      <div>
        <h2>RealTime State Change</h2>
        <pre>
          <code>{JSON.stringify(state, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};

export default DynamicSelect;
