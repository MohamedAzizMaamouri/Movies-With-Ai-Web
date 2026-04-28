from pydantic import BaseModel
from typing import Optional, List

class TVBase(BaseModel):
    id: int
    name: str
    overview: Optional[str]
    poster_path: Optional[str]
    backdrop_path: Optional[str]
    vote_average: Optional[float]
    first_air_date: Optional[str]
    genre_ids: Optional[List[int]] = []

class TVDetail(BaseModel):
    id: int
    name: str
    overview: Optional[str]
    poster_path: Optional[str]
    backdrop_path: Optional[str]
    vote_average: Optional[float]
    first_air_date: Optional[str]
    genres: list = []
    number_of_seasons: Optional[int]