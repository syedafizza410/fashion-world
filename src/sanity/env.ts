export const apiVersion = '2023-01-01'; // Directly setting API version

export const dataset = 'production'; // Directly setting dataset

export const projectId = 'cu5ect1r'; // Directly setting project ID

// Function to assert the value of the environment variable
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage); // If the value is undefined, throw an error
  }

  return v;
}

export const useCdn = process.env.NODE_ENV === 'production'; // Use CDN only in production
