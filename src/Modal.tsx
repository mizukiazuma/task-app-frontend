import { deleteTask } from "./api/tasks";

interface Props{
  id:number;
  showFlag:boolean;
  setShowModal:any;
  onButtonClick:() => void;
}
export function Modal(props:Props){
    const {id,showFlag,setShowModal,onButtonClick} = props
    const modalContent = {
    background: "white",
    padding: "10px",
    borderRadius: "3px",
    };
    const overlay = {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
    async function handlesubmit(id:number){
      await deleteTask(id);
      onButtonClick();
    };
    return(
        <>
      {showFlag ? (
        <div id="overlay" style={overlay}>
          <div id="modalContent" style={modalContent}>
            <p>本当に削除しますか？</p>
            <button onClick={() => setShowModal(false)}>戻る</button>
            <button onClick={() => handlesubmit(id)}>削除</button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
    )
}