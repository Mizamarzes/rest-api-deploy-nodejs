const z = require('zod')

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: "Movie title must be a string",
        required_error: 'Movie title is required'
    }),
    year: z.number().int().positive().min(1900).max(2025),
    director: z.string(),
    duration: z.number().int().positive(),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }),
    genre: z.array(z.string(
        z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Crime']),
        {
            required_error: 'Movie genre is required',
            invalid_type_error: 'Movie genre must be an array of enum Genre'
        }
    )),
    rate: z
        .number({
            invalid_type_error: "Rate must be a number",
            required_error: "Rate is required"
        })
        .min(0, { message: "Rate must be at least 0" })
        .max(10, { message: "Rate cannot exceed 10" })
        .default(5)
})

function validateMovie (object) {
    return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
    return movieSchema.partial().safeParse(object)
}

module.exports = {
    validateMovie,
    validatePartialMovie
}