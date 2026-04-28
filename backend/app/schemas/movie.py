from pydantic import BaseModel
from typing import Optional, List

class Genre(BaseModel):
    id: int
    name: str

class MovieBase(BaseModel):
    id: int
    title: str
    overview: Optional[str]
    poster_path: Optional[str]
    backdrop_path: Optional[str]
    vote_average: Optional[float]
    release_date: Optional[str]
    genre_ids: Optional[List[int]] = []

class MovieDetail(BaseModel):
    id: int
    title: str
    overview: Optional[str]
    poster_path: Optional[str]
    backdrop_path: Optional[str]
    vote_average: Optional[float]
    release_date: Optional[str]
    genres: List[Genre] = []
    runtime: Optional[int]