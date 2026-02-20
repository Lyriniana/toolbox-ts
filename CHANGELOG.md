"""
Shared utility functions for toolbox-ts.
"""

import hashlib
import logging
import os
import time
from pathlib import Path
from typing import Any, Callable, List, Optional, TypeVar

logger = logging.getLogger(__name__)
T = TypeVar("T")


def retry(
    func: Callable[..., T],
    *args: Any,
    max_attempts: int = 3,
    delay: float = 1.0,
    backoff: float = 2.0,
    exceptions: tuple = (Exception,),
    **kwargs: Any,
) -> T:
    """
    Call *func* with retry logic on specified exceptions.

    Args:
        func: Callable to retry.
        max_attempts: Maximum number of attempts.
        delay: Initial delay between retries in seconds.
        backoff: Multiplier applied to delay after each attempt.
        exceptions: Exception types that trigger a retry.

    Returns:
        Return value of *func* on success.

    Raises:
        The last exception raised if all attempts fail.
    """
    last_exc: Optional[Exception] = None
    wait = delay
    for attempt in range(1, max_attempts + 1):
        try:
            return func(*args, **kwargs)
        except exceptions as exc:
            last_exc = exc
            if attempt < max_attempts:
                logger.warning(
                    "Attempt %d/%d failed (%s). Retrying in %.1fs…",
                    attempt, max_attempts, exc, wait,
                )
                time.sleep(wait)
                wait *= backoff
    raise last_exc  # type: ignore[misc]


def chunks(lst: List[T], size: int) -> List[List[T]]:
    """Split *lst* into sub-lists of at most *size* elements."""
    return [lst[i: i + size] for i in range(0, len(lst), size)]


def ensure_dir(path: Path) -> Path:
    """Create *path* and all parents if they don't exist. Returns *path*."""
    path.mkdir(parents=True, exist_ok=True)
    return path


def file_hash(path: Path, algorithm: str = "sha256") -> str:
    """Compute hex digest of *path* using *algorithm*."""
    h = hashlib.new(algorithm)
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def human_size(n_bytes: int) -> str:
    """Return a human-readable string for *n_bytes*."""
    for unit in ("B", "KB", "MB", "GB", "TB"):
        if n_bytes < 1024:
            return f"{n_bytes:.1f} {unit}"
        n_bytes /= 1024  # type: ignore[assignment]
    return f"{n_bytes:.1f} PB"


def flatten(nested: List) -> List:
    """Recursively flatten a nested list."""
    result = []
    for item in nested:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result
