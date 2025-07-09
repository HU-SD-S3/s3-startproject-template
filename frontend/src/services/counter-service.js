export class CounterService {
  increment() {
    return fetch("/api/counter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ increment: 1 }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error incrementing counter:", error);
        throw error;
      });
  }

  getCount() {
    return fetch("/api/counter")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching counter:", error);
        throw error;
      });
  }
}
