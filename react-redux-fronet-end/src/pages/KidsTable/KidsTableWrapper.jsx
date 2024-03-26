import {
  useGetFullListQuery,
  useValidateTokenQuery,
} from "../../redux-slices/sliceApi";

// Lifecycle components
import { IsLoading } from "../../components/lifecycle/IsLoading";
import { IsError } from "../../components/lifecycle/IsError";

// Children components
import { KidsTable } from "./KidsTable";
import { KidsTableRow } from "./KidsTableRow";

//
import { useEffect } from "react";
import { useSelector } from "react-redux";

// Utils

import { fetchedKidsSorter } from "../../utils/fetchedKidsSorter";

// Redirect logic

import { useAuthStatusRedirect } from "../../custom-hooks/auth-redirect";
import { useTokenValidate } from "../../custom-hooks/validate-token";

export const KidsTableWrapper = () => {
  const { data, error, isError, isLoading, isSuccess } = useGetFullListQuery();

  // Below we use optional chaining to avoid errors if data is undefined
  let sortedData;

  if (isSuccess && data?.data?.Kids) {
    // Apply sorting only when the data is available
    sortedData = fetchedKidsSorter(data.data.Kids);
  }

  const modalState = useSelector((state) => state.modals.currentModal);

  // Prevents scrolling of the body when the modal is open
  useEffect(() => {
    if (modalState !== null) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "auto";
  }, [modalState]);

  return (
    <>
      {isError && <IsError error={error} />}
      {isLoading && <IsLoading />}
      {isSuccess && (
        <KidsTable>
          {sortedData.map((item, index) => (
            <KidsTableRow key={item._id} item={item} index={index} />
          ))}
        </KidsTable>
      )}
    </>
  );
};
