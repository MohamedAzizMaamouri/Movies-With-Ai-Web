import httpx
from app.core.config import settings

BASE_URL = settings.TMDB_BASE_URL
API_KEY  = settings.TMDB_API_KEY

async def fetch(endpoint: str, params: dict = {}):
    url = f"{BASE_URL}{endpoint}"
    params["api_key"] = API_KEY
    async with httpx.AsyncClient() as client:
        res = await client.get(url, params=params)
        res.raise_for_status()
        return res.json()

# --- Movies ---
async def get_popular_movies(page: int = 1):
    return await fetch("/movie/popular", {"page": page})

async def get_trending_movies(time_window: str = "week"):
    return await fetch(f"/trending/movie/{time_window}")

async def get_top_rated_movies(page: int = 1):
    return await fetch("/movie/top_rated", {"page": page})

async def get_upcoming_movies(page: int = 1):
    return await fetch("/movie/upcoming", {"page": page})

async def get_movie_detail(movie_id: int):
    data     = await fetch(f"/movie/{movie_id}", {"append_to_response": "credits,videos"})
    return data

# --- TV Shows ---
async def get_popular_tv(page: int = 1):
    return await fetch("/tv/popular", {"page": page})

async def get_trending_tv(time_window: str = "week"):
    return await fetch(f"/trending/tv/{time_window}")

async def get_top_rated_tv(page: int = 1):
    return await fetch("/tv/top_rated", {"page": page})

async def get_tv_detail(tv_id: int):
    return await fetch(f"/tv/{tv_id}", {"append_to_response": "credits,videos"})

# --- Search ---
async def search_multi(query: str, page: int = 1):
    return await fetch("/search/multi", {"query": query, "page": page})

async def search_movies(query: str, page: int = 1):
    return await fetch("/search/movie", {"query": query, "page": page})

async def search_tv(query: str, page: int = 1):
    return await fetch("/search/tv", {"query": query, "page": page})