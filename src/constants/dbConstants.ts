export const DB_TABLE = Object.freeze({
	USERS: "users",
	FAVORITE_CITY: "favorite_city",
	WEATHER_HISTORY: "weather_history"
});

export const USERS_COLUMNS = Object.freeze({
	ID: "id",
	EMAIL: "email",
	FIRST_NAME: "first_name",
});

export const FAVORITE_CITY_COLUMNS = Object.freeze({
	ID: "id",
	USER_ID: "user_id",
	CITY_NAME: "city_name",
	COUNTRY_CODE: "country_code"
});

export const WEATHER_HISTORY_COLUMNS = Object.freeze({
	ID: "id",
	USER_ID: "user_id",
	CITY_NAME: "city_name",
	COUNTRY_CODE: "country_code",
	WEATHER_DATA: "weather_data"
});
