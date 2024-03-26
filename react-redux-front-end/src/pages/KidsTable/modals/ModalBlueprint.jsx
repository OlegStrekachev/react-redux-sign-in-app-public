// Importing React and Redux hooks, and modal components
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux-slices/modalSlice";
import { ModalWindowPortal } from "./ModalWindowPortal";
import { ModalCreateNewRecord } from "./ModalCreateNewRecord";
import { ModalDeleteRecord } from "./ModalDeleteRecord";
import { ModalEditRecord } from "./ModalEditRecord";
import { ModalPrintingOptions } from "./ModalPrintingOptions";
import { useHandleKeyPress } from "../../../custom-hooks/handleKeyPress";
import styles from "./ModalBlueprint.module.css";

// Main modal component used to display different types of modals
export const ModalBlueprint = () => {
  // Retrieving the current modal state from Redux store
  const modalState = useSelector((state) => state.modals.currentModal);

  // Effect for handling the modal state

  // useEffect(() => {
  //   console.log('modalState', modalState)
  //   const scrollableElement = document.getElementById('root'); // Replace with the correct ID or selector
  //   const preventScroll = (e) => {
  //     e.preventDefault();
  //   };
  
  //   if (modalState) {
  //     document.body.style.touchAction = 'none';
  //     document.body.style.height = '100%';
  //     document.body.style.width = '100%';
  //     document.body.style.overflow = 'hidden';

  //     // scrollableElement.style.overflowY = 'hidden';
  //     // document.addEventListener('wheel', preventScroll, { passive: false });
  //     // document.addEventListener('touchmove', preventScroll, { passive: false });
  //   } else {
  //     document.body.style.touchAction = 'auto';
  //     document.body.style.height = 'auto';
  //     document.body.style.width = 'auto';
  //     document.body.style.overflow = 'auto';
  //     // scrollableElement.style.overflowY = '';
  //     // document.removeEventListener('wheel', preventScroll, { passive: false });
  //     // document.removeEventListener('touchmove', preventScroll, { passive: false });
  //   }
  
  //   // Cleanup function
  //   return () => {
  //     // scrollableElement.style.overflowY = ''; // Reset on cleanup
  //     document.removeEventListener('wheel', preventScroll, { passive: false });
  //     document.removeEventListener('touchmove', preventScroll, { passive: false });
  //   };
  // }, [modalState]);
  
  
  // Hook to dispatch Redux actions
  const dispatch = useDispatch();

  // Function to close the modal
  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  // Effect for handling global Escape key press to close the modal
  useHandleKeyPress(handleCloseModal, "Escape");

  // Function to determine which modal content to render
  const renderModalContent = () => {
    switch (modalState) {
      case "createNewRecord":
        return <ModalCreateNewRecord />;
      case "deleteRecord":
        return <ModalDeleteRecord />;
      case "editRecord":
        return <ModalEditRecord />;
      case "printingOptions":
        return <ModalPrintingOptions />;
      default:
        return null; // Render nothing for undefined modal state
    }
  };

  // Conditional rendering of the Modal based on the modalState
  return (
    modalState && (
      <ModalWindowPortal>
        <div className={styles.modal}>
          <div className={styles.modalWrapper}>
            <button className={styles.closeButton} onClick={handleCloseModal}>
              &times; {/* Close button */}
            </button>
            {renderModalContent()} {/* Rendering the selected modal */}
          </div>
        </div>
      </ModalWindowPortal>
    )
  );
};
