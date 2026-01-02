"use client";

import { motion } from "framer-motion";
import { ArticleHeader } from "@/components/blog/article-header";
import { StreamdownRenderer } from "@/components/blog/streamdown";
import { StreamdownTOC } from "@/components/blog/streamdown-toc";
import { extractTOCFromText, shouldShowTOC } from "@/lib/toc";

// Article metadata
const articleData = {
  title: "Binary Code: The Foundation of Digital Computing",
  description:
    "A comprehensive technical analysis of binary number systems, bitwise operations, two's complement representation, IEEE 754 floating-point formats, and practical applications in modern computing architecture.",
  author: "Engineering Research",
  date: "2024-12-21",
  readTime: "28 min",
  tags: [
    "Computer Science",
    "Binary",
    "Digital Systems",
    "Low-Level Programming",
  ],
  image: "/images/blog/binary-code-guide-pixel.jpeg",
  featured: true,
};

export function BinaryCodeGuideContent() {
  const content = `# Binary Code: The Foundation of Digital Computing

**Abstract**

Binary code represents the fundamental language of digital computing systems. Where humans communicate using natural language composed of thousands of characters, computers process information using only two discrete states: on and off, represented mathematically as 1 and 0. This binary foundation underlies every aspect of modern computing, from the simplest embedded microcontroller to the most sophisticated cloud infrastructure. This report provides a rigorous technical analysis of binary number systems, examining positional notation in base-2, bitwise logical operations, signed integer representation using two's complement, IEEE 754 floating-point formats, and the practical engineering considerations that influence how developers and system architects work with binary data.

## 1. The Binary Number System

### 1.1 Fundamental Concepts

The binary number system, at its core, operates on a principle of radical simplicity: every quantity can be represented using only two symbols. While humans have evolved to use base-10 (decimal) mathematics—likely because we have ten fingers—this cultural artifact has no mathematical privilege. Any positive integer can be expressed in any base, and binary offers unique advantages for implementation in electronic circuits where two distinct voltage levels can reliably represent information.

The binary system's base is 2, meaning each position in a binary number represents a power of 2, unlike decimal which represents powers of 10. Consider the binary number \`1101₂\`. Reading from right to left, the positions represent 2⁰, 2¹, 2², and 2³ respectively:

*   Rightmost position (2⁰ = 1): digit \`1\` contributes \`1 × 1 = 1\`
*   Next position (2¹ = 2): digit \`0\` contributes \`0 × 2 = 0\`
*   Next position (2² = 4): digit \`1\` contributes \`1 × 4 = 4\`
*   Leftmost position (2³ = 8): digit \`1\` contributes \`1 × 8 = 8\`

Summing these contributions yields 8 + 4 + 0 + 1 = 13. The subscript ₂ denotes binary notation, distinguishing it from decimal or hexadecimal representations.

### 1.2 Binary and Digital Circuitry

The mathematical abstraction of binary finds its physical manifestation in electronic circuits through voltage levels. Modern semiconductor technology typically employs two voltage ranges to represent binary states: a lower voltage range (near 0V) represents logical 0, while a higher voltage range (commonly 1.8V, 3.3V, or 5V depending on the technology) represents logical 1.

This binary representation provides exceptional noise immunity. A signal intended to be 0V might measure 0.1V due to electromagnetic interference, yet the receiving circuit interprets any voltage below the threshold as a clean 0. Similarly, a signal intended to be 3.3V might measure 3.2V due to voltage drop across a trace, yet remains well above the threshold for interpreting a 1. This tolerance for signal degradation enables reliable computation across millions of transistors on a single silicon die.

The relationship between binary representation and transistor count follows exponential mathematics. An n-bit binary number can represent 2ⁿ distinct values. Modern 64-bit processors can therefore theoretically address 2⁶⁴ bytes of memory—approximately 16 exabytes—a capacity that will not be fully utilized in practical systems for decades to come.

## 2. Bitwise Operations

### 2.1 Logical Operations

Bitwise operations manipulate individual bits within binary numbers, providing the primitive operations from which all computational logic is constructed. These operations execute in constant time at the hardware level, making them essential tools for performance-critical code.

The AND operation compares corresponding bits of two numbers, producing 1 only if both bits are 1:

\`\`\`text
  1011₂ (11)
& 1101₂ (13)
--------
  1001₂ (9)
\`\`\`

The OR operation produces 1 if either bit is 1:

\`\`\`text
  1011₂ (11)
| 1101₂ (13)
--------
  1111₂ (15)
\`\`\`

The XOR (exclusive OR) operation produces 1 only if the bits differ:

\`\`\`text
  1011₂ (11)
^ 1101₂ (13)
--------
  0110₂ (6)
\`\`\`

The NOT operation inverts all bits of a single number:

\`\`\`text
~ 1011₂ (11)
--------
  0100₂ (4, assuming 4-bit representation)
\`\`\`

### 2.2 Shift Operations

Shift operations move bits left or right within a register, providing efficient multiplication and division by powers of 2, as well as serving as foundational operations for more complex algorithms.

The left shift operator moves all bits toward more significant positions, filling vacated positions with zeros:

\`\`\`text
  1011₂ (11)
<< 2
--------
  1100₂ (44)
\`\`\`

Left-shifting by n positions multiplies the number by 2ⁿ, so 11 << 2 = 44 = 11 × 4. In unsigned arithmetic, left shift provides exact multiplication by powers of 2. In signed arithmetic, overflow can occur, changing the sign or magnitude unexpectedly.

The right shift operator moves bits toward less significant positions. For unsigned numbers, logical right shift fills vacated positions with zeros:

\`\`\`text
  1100₂ (12, unsigned)
>> 2
--------
  0011₂ (3)
\`\`\`

For signed numbers using two's complement representation, arithmetic right shift replicates the sign bit, preserving the sign while dividing by powers of 2:

\`\`\`text
  1100₂ (-4, two's complement)
>> 2
--------
  1111₂ (-1)
\`\`\`

Right-shifting by n positions performs integer division by 2ⁿ, discarding any fractional remainder.

### 2.3 Practical Applications

Bitwise operations enable sophisticated data manipulation techniques in systems programming and embedded development. Bit masks isolate specific bits within a register, essential for interacting with hardware peripherals where each bit might control a different function:

\`\`\`c
#define RX_READY 0x01
#define TX_READY 0x02
#define ERROR_FLAG 0x04

uint8_t status = 0;

// Check if receiver is ready
if (status & RX_READY) {
    // Read data from peripheral
}

// Clear error flag while preserving other bits
status &= ~ERROR_FLAG;
\`\`\`

Bit fields pack multiple boolean flags into a single byte, reducing memory consumption in memory-constrained environments:

\`\`\`c
struct {
    uint8_t is_connected : 1;
    uint8_t is_authenticated : 1;
    uint8_t has_data : 1;
    uint8_t buffer_full : 1;
    uint8_t : 4;  // Unused padding
} flags;
\`\`\`

XOR-based algorithms enable efficient checksums and error detection. The XOR of a sequence of values produces a checksum where any single-bit change can be detected, though this simple checksum cannot correct errors or detect all multiple-bit changes.

## 3. Signed Integer Representation

### 3.1 The Challenge of Negative Numbers

Representing negative numbers in binary requires additional convention. Several approaches have been historically employed, each with distinct trade-offs: sign-magnitude representation uses one bit for sign and the remaining bits for magnitude; one's complement inverts all bits to represent negative values; and two's complement, the modern standard, adds 1 to the one's complement representation.

Two's complement emerged as the dominant representation because it provides several critical advantages: a single representation of zero (unlike sign-magnitude or one's complement which have positive and negative zero), natural arithmetic behavior where addition and subtraction work without special cases, and efficient hardware implementation using the same circuits as unsigned addition.

### 3.2 Two's Complement Mechanics

To compute the two's complement negative of a binary number, invert all bits (ones' complement) and add 1:

\`\`\`text
  Original:     0000 0110 (6)
  Invert bits:  1111 1001
  Add 1:        1111 1010 (-6)
\`\`\`

Verifying this property through addition:

\`\`\`text
  6:  0000 0110
+ -6: 1111 1010
-----------
  0:  0000 0000 (with carry-out ignored)
\`\`\`

The range of an n-bit two's complement system is asymmetric: -2ⁿ⁻¹ to 2ⁿ⁻¹ - 1. For 8-bit integers, this is -128 to +127. The asymmetry exists because there is no positive representation for the most negative number—128 cannot be represented as a positive 8-bit two's complement value.

### 3.3 Overflow and Underflow

Integer overflow occurs when an arithmetic operation produces a result outside the representable range. In two's complement arithmetic, overflow has a specific pattern: it occurs when adding two positive numbers produces a negative result, or when adding two negative numbers produces a positive result.

\`\`\`text
  0111 0111 (127)
+ 0000 0001 (1)
-----------
  1000 1000 (-120, incorrect)
\`\`\`

The carry-out of the most significant bit does not indicate overflow—the overflow flag depends on whether the carry-in to the most significant bit differs from the carry-out. Modern processors provide overflow flags that software can inspect after arithmetic operations, enabling detection of these edge cases in safety-critical code.

## 4. Floating-Point Representation

### 4.1 The IEEE 754 Standard

Floating-point representation extends binary numbers to support fractions and very large or very small values. The IEEE 754 standard, first published in 1985 and revised in 2008 and 2019, defines the binary formats used in virtually all modern computing systems.

The standard defines three binary formats: binary16 (half precision, 16 bits), binary32 (single precision, 32 bits), and binary64 (double precision, 64 bits). The single-precision format illustrates the fundamental structure:

\`\`\`text
| Sign (1 bit) | Exponent (8 bits) | Mantissa (23 bits) |
\`\`\`

The value represented is: (-1)ˢ × 2^(E-127) × 1.M

The leading 1 before the binary point is implicit, stored implicitly rather than consuming bits of the mantissa field.

### 4.2 Special Values

IEEE 754 allocates specific bit patterns to special values. The exponent field of all 1s (255 in single precision) indicates infinity or NaN (Not a Number) depending on the mantissa field. Zero is represented with an exponent of 0 and a mantissa of 0—the sign bit determines whether this is +0 or -0, though comparisons treat them as equal.

Denormalized numbers (subnormal numbers) provide gradual underflow near zero. When the exponent field is 0 but the mantissa is non-zero, the number represents 2^(-126) × 0.M rather than 2^(-126) × 1.M. This enables representation of values smaller than the smallest normalized number, trading precision for range.

### 4.3 Precision and Rounding

The 23-bit mantissa field of single-precision provides approximately 6-7 decimal digits of precision. This limited precision leads to common pitfalls:

\`\`\`javascript
// Floating-point precision issues
0.1 + 0.2 !== 0.3  // true! (0.30000000000000004)
\`\`\`

The binary representation of common decimal fractions requires infinite repeating sequences, just as 1/3 requires infinite 0.333... in decimal. When stored in finite floating-point precision, these values accumulate rounding errors.

IEEE 754 defines several rounding modes, with round-to-nearest (ties to even) being the default. This mode minimizes accumulated error over many operations and avoids statistical bias toward even or odd values at tie-breaking boundaries.

## 5. Practical Engineering Considerations

### 5.1 When to Use Binary Representations

Modern high-level languages abstract binary operations from most developers, but understanding binary fundamentals remains essential for several specializations. Systems programming requires bitwise manipulation for device drivers, memory-mapped I/O, and operating system kernels. Embedded development demands efficient resource utilization where bit-packing reduces memory consumption. Security engineering requires understanding how data representation affects cryptographic operations and side-channel vulnerabilities. Performance optimization leverages bitwise tricks for operations that compilers cannot auto-vectorize efficiently.

### 5.2 Endianness

Multi-byte values can be stored in memory in different orders. Big-endian systems store the most significant byte at the lowest address, matching the conventional reading order. Little-endian systems store the least significant byte at the lowest address, providing convenient integer arithmetic at the lowest address.

The 32-bit value 0x12345678 appears in memory as:

\`\`\`text
Big-endian:    12 34 56 78
Little-endian: 78 56 34 12
\`\`\`

Network protocols traditionally use big-endian byte order (network byte order), requiring conversion functions when communicating between systems with different native endianness. The terms "host byte order" and "network byte order" distinguish between native representation and the standardized network representation.

### 5.3 Binary Code Tools

Practical work with binary code benefits from specialized tools. Bitwise converters translate between binary, decimal, hexadecimal, and octal representations. Binary translators handle batch conversion of text files between encodings. Bitwise calculators evaluate expressions involving binary operators, showing intermediate results in multiple bases. Bit pattern visualizers display binary representations with color-coded bit positions, aiding pattern recognition.

## 6. Conclusion

Binary code forms the indivisible foundation of digital computation, translating the mathematical abstraction of Boolean algebra into physical reality through semiconductor physics. From the simple elegance of positional notation in base-2 through the sophisticated compromises of IEEE 754 floating-point, the binary representation of information shapes every aspect of computing system design.

Understanding binary fundamentals enables engineers to write more efficient code, debug subtle hardware-software interactions, and make informed decisions about data representation in system design. While high-level abstractions increasingly insulate application developers from direct binary manipulation, the principles remain essential for anyone working at the boundaries where software meets hardware or where performance constraints demand optimal implementation.

The binary abstraction has proven remarkably durable across seven decades of computing evolution. As quantum computing and other alternative computational paradigms emerge, the fundamental insight that discrete states can represent information remains relevant—now with qubits providing superposition of states rather than classical binary digits. Understanding classical binary provides the essential foundation for comprehending these emerging technologies and their relationship to the computing systems that have transformed human civilization.
`;

  const tocItems = extractTOCFromText(content);
  const showTOC = shouldShowTOC(tocItems);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="flex gap-8">
        {/* Main Content */}
        <motion.article
          className={`${showTOC ? "lg:w-2/3" : "max-w-4xl mx-auto"}`}
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          <motion.div className="space-y-8" variants={fadeInUp}>
            {/* Article Header with Cover Image */}
            <ArticleHeader
              title={articleData.title}
              description={articleData.description}
              author={articleData.author}
              date={articleData.date}
              readTime={articleData.readTime}
              tags={articleData.tags}
              image={articleData.image}
              featured={articleData.featured}
            />

            {/* Article Content */}
            <div className="prose prose-lg max-w-none streamdown-content">
              <StreamdownRenderer content={content} />
            </div>
          </motion.div>
        </motion.article>

        {/* Enhanced Streamdown TOC */}
        {showTOC && (
          <StreamdownTOC
            items={tocItems}
            enableAutoExtract={false}
            stickyOffset={80}
            showProgress={true}
          />
        )}
      </div>
    </div>
  );
}
