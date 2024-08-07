import React from "react";
import { Button } from "@/components/ui/button";
import { PlayerPaginationProps } from "@/types/index";

const PlayerPagination: React.FC<PlayerPaginationProps> = ({
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <div className="flex justify-space-between items-center m-4">
      <div className="flex justify-between m-2 p-2 gap-2">
        <Button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="bg-customRed"
        >
          Anterior
        </Button>
      </div>
      <div className="flex justify-between m-2 p-2 gap-2">
        <Button
          onClick={onNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className="bg-customRed"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default PlayerPagination;
