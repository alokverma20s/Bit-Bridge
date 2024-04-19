export const LANGUAGE_VERSIONS = {
    cpp: "10.2.0",
    javascript: "18.15.0",
    python: "3.10.0",
    java: "15.0.2",
    c: "10.2.0",
}

export const CODE_SNIPPETS = {
    javascript: `\nfunction greet(name){\nconsole.log("Hello, " + name);\n}\n\n// Call the function\n\ngreet("World");`,
    python: `\ndef greet(name):\n    return "Hello, " + name\n\n# Call the function\n\nprint(greet("World"))`,
    java: `\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
    c: `\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}`,
    cpp: `\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}`,
}

export const question = {
    problemName: 'Two Sum',
    difficulty: 'Easy',
    topics: ['Array', 'Hash Table'],
    hint:["helo", 'fljsdlfjsdlfjlsd fljasdlfja f lorem10 '],
    company: ['Amazon', 'Apple', 'Facebook', 'Google', 'Microsoft', 'Adobe', 'Oracle', 'Uber', 'Yahoo'],
    problemStatement: [`Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.`,
    `You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    `You can return the answer in any order.`],
    example: [
        {
            input: `nums = [2, 7, 11, 15], target = 9`,
            output: `[0, 1]`
        },
        {
            input: `nums = [3, 2, 4], target = 6`,
            output: `[1, 2]`
        },
        {
            input: `nums = [3, 3], target = 6`,
            output: `[0, 1]`
        }
    ],
    constraints:[
        '2 <= nums.length <= 10<sup>4</sup>',
        '-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup>',
        '-10<sup>9</sup> <= target <= 10<sup>9</sup>',
        'Only one valid answer exists.'
    ],
    followUp: `Can you come up with an algorithm that is less than O(n<sup>2</sup>) time complexity?`
}