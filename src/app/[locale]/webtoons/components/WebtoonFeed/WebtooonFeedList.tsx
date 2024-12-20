"use client";

import { Row } from "@/components/ui/common";
import { useTranslations } from "next-intl";
import { ListResponse } from "@/resources/globalTypes";
import useListData from "@/hooks/listData";
import WebtoonGridPaginated from "@/components/shared/WebtoonGridPaginated";
import { Button } from "@/shadcn/ui/button";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu, DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/shadcn/ui/dropdown-menu";
import { AgeLimit } from "@/resources/webtoons/dtos/webtoon.dto";
import { WebtoonPreviewT } from "@/resources/webtoons/dtos/webtoonPreview.dto";
import { listWebtoons, WebtoonFilterT } from "@/resources/webtoons/controllers/webtoonPreview.controller";
import { GenreT } from "@/resources/genres/genre.dto";

export default function WebtooonFeedList({
  genres, initialWebtoonListResponse,
}: {
  genres: GenreT[];
  initialWebtoonListResponse: ListResponse<WebtoonPreviewT>;
}) {

  const initialFilters: WebtoonFilterT = {
    page: 1,
    genreIds: [],
    ageLimits: [],
  };
  const { listResponse, filters, setFilters } = useListData(
    listWebtoons, initialFilters, initialWebtoonListResponse);

  const TallSeries = useTranslations("allSeries");
  const Tage = useTranslations("ageRestriction");

  return (
    <>
      <Row className="gap-4 mb-9">
        <FilterSelector
          filterTitle={TallSeries("genre")}
          filterKey="genreIds"
          items={genres.map(genre => ({
            label: genre.localized.label,
            value: genre.id,
          }))}
          filters={filters}
          setFilters={setFilters}
        />
        <FilterSelector
          filterTitle={TallSeries("ageRestriction")}
          filterKey="ageLimits"
          items={Object.values(AgeLimit)
            .map((item) => ({
              label: Tage(item),
              value: item
            }))}
          filters={filters}
          setFilters={setFilters}
        />
      </Row>

      <WebtoonGridPaginated
        listResponse={listResponse}
        filters={filters}
        setFilters={setFilters}
        noItemsMessage="관련 웹툰 없음" //TODO
      />
    </>
  );
}

//   const TallSeries = useTranslations("allSeries");
type FilterKey = {
  [K in keyof WebtoonFilterT]: WebtoonFilterT[K] extends any[] ? K : never;
}[keyof WebtoonFilterT];
type FilterValue = WebtoonFilterT[FilterKey][number];
function FilterSelector({
  filterTitle, filterKey, items, filters, setFilters
}: {
  filterTitle: string;
  filterKey: FilterKey;
  items: {
    label: string;
    value: FilterValue;
  }[];
  filters: Partial<WebtoonFilterT>;
  setFilters: Dispatch<SetStateAction<Partial<WebtoonFilterT>>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selections, setSelections] = useState<FilterValue[]>([]);
  const currentFilter = useMemo(() => filters[filterKey] || [] as FilterValue[], [filterKey, filters]);
  useEffect(() => {
    if (isOpen) {
      setSelections(currentFilter);
    }
  }, [currentFilter, isOpen]);

  return <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="w-56">
        <div className="flex-1 text-left">
          {displayFilter(filterTitle,
            ...currentFilter.map(value => {
              const item = items
                .find(i => i.value === value)!;
              return item.label;
            })
          )}</div>
        <div>
          <ChevronDown className="h-4 w-4 opacity-50"/>
        </div>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      {items.map((item, index) => {
        return <DropdownMenuCheckboxItem
          key={index}
          checked={selections.includes(item.value)}
          onClick={(e) => {
            e.preventDefault();
            setSelections(prev => {
              if (prev.includes(item.value)) {
                return prev.filter((prevVal) => prevVal !== item.value);
              } else {
                return [...prev, item.value];
              }
            });
          }}
        >
          {item.label}
        </DropdownMenuCheckboxItem>;
      })}
      <Row className="mt-2">
        <Button
          className="flex-1"
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            setSelections([]);
          }}>클리어</Button>
        <Button
          className="flex-1"
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(false);
            setFilters(prev => {
              return {
                ...prev,
                [filterKey]: selections,
              };
            });
          }}>검색</Button>
      </Row>
    </DropdownMenuContent>
  </DropdownMenu>;
}


const displayFilter = (filterLabel: string, ...selectionLabels: string[]) => {
  if (selectionLabels.length === 0) {
    return filterLabel;
  } else if (selectionLabels.length === 1) {
    return `${filterLabel}: ${selectionLabels[0]}`;
  }
  return `${filterLabel}: ${selectionLabels[0]} +${selectionLabels.length - 1}`;
};
