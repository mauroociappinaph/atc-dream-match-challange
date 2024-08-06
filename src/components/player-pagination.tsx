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
    <div className="flex justify-center items-center mt-4">
      <Button onClick={onPreviousPage} disabled={currentPage === 1}>
        Anterior
      </Button>
      <Button
        onClick={onNextPage}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Siguiente
      </Button>
    </div>
  );
};

export default PlayerPagination;
