# Contributing to KittyEncode

First off, thank you for considering contributing to KittyEncode! It's people like you that make this project better.

## 🤝 How to Contribute

### 🐛 Bug Reports

If you find a bug, please create an issue with the following information:

```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What should happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- Browser: [e.g. Chrome 91]
- OS: [e.g. iOS]
- Device: [e.g. Desktop, iPhone 12]
- URL: [e.g. https://kitty-encode.top/tools/base64-encoder]
```

### 💡 Feature Requests

For new features, please open a discussion or issue:

```markdown
**Feature Description**
Clear description of the proposed feature.

**Use Case**
Why is this feature needed? Who would benefit?

**Alternatives Considered**
Other solutions you've considered.

**Implementation Ideas**
Any thoughts on how this could be implemented.
```

### 🔧 Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/SymphonyIceAttack/kitty-encode.git
   cd kitty-encode
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Make your changes**
   - Follow our code style
   - Add tests if applicable
   - Update documentation

5. **Test your changes**
   ```bash
   npm run lint
   npm run format
   npm run type-check
   npm run build
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

8. **Open a Pull Request**

## 🎯 Development Guidelines

### Code Style

We use [Biome](https://biomejs.dev/) for linting and formatting:

```bash
# Check code quality
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
type(scope): description

feat: add new URL encoding tool
fix: resolve base64 decoding issue
docs: update installation guide
style: format code with biome
refactor: improve component structure
test: add unit tests for encoding utils
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

**Scopes:**
- `ui`: User interface changes
- `tools`: Encoding tool changes
- `i18n`: Internationalization
- `seo`: SEO-related changes
- `build`: Build process
- `deps`: Dependency updates

### TypeScript Guidelines

1. **Use strict typing**
   ```typescript
   // ✅ Good
   const processData = (input: string): string => {
     return input.toUpperCase();
   };

   // ❌ Bad
   const processData = (input: any) => {
     return input.toUpperCase();
   };
   ```

2. **Use proper types for imports**
   ```typescript
   // ✅ Good
   import type { Metadata } from 'next';

   // ❌ Bad
   import { Metadata } from 'next';
   ```

3. **Avoid `any` types**
   ```typescript
   // ✅ Good
   interface ToolConfig {
     name: string;
     description: string;
     supportedFormats: string[];
   }

   // ❌ Bad
   interface ToolConfig {
     name: any;
     description: any;
     supportedFormats: any[];
   }
   ```

### React Guidelines

1. **Use functional components**
   ```typescript
   // ✅ Good
   const ToolCard: React.FC<Props> = ({ title, description }) => {
     return (
       <Card>
         <CardTitle>{title}</CardTitle>
         <CardDescription>{description}</CardDescription>
       </Card>
     );
   };

   // ❌ Bad
   class ToolCard extends React.Component<Props> {
     render() {
       return (
         <Card>
           <CardTitle>{this.props.title}</CardTitle>
           <CardDescription>{this.props.description}</CardDescription>
         </Card>
       );
     }
   }
   ```

2. **Use proper hooks patterns**
   ```typescript
   // ✅ Good
   const useToolData = (toolId: string) => {
     const [data, setData] = useState<ToolData | null>(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       const fetchData = async () => {
         // Fetch logic
       };
       fetchData();
     }, [toolId]);

     return { data, loading };
   };

   // ❌ Bad - complex logic in component
   const ToolComponent = ({ toolId }) => {
     const [data, setData] = useState(null);
     // Complex logic mixed with JSX
   };
   ```

3. **Client/Server component separation**
   ```typescript
   // ✅ Good - Server Component
   // app/tools/page.tsx
   export default async function ToolsPage() {
     // Server-side logic
     return <ToolsClientComponent />;
   }

   // ✅ Good - Client Component
   // components/tools/tools-client.tsx
   'use client';
   export const ToolsClientComponent = () => {
     // Client-side logic with hooks
   };
   ```

### CSS/Styling Guidelines

1. **Use Tailwind CSS utilities**
   ```tsx
   // ✅ Good
   <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
     <h2 className="text-xl font-semibold text-gray-900">Title</h2>
     <Button variant="outline" size="sm">Action</Button>
   </div>

   // ❌ Bad - inline styles
   <div style={{ display: 'flex', padding: '16px' }}>
   ```

2. **Use design system components**
   ```tsx
   // ✅ Good
   import { Button } from '@/components/ui/button';
   import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

   // ❌ Bad - custom styling
   <div className="custom-button-style">
   ```

3. **Follow responsive design patterns**
   ```tsx
   // ✅ Good
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
     {/* Responsive grid */}
   </div>

   // ❌ Bad - not responsive
   <div className="flex flex-col gap-4">
   ```

## 🌍 Internationalization

When adding new text content, please follow these guidelines:

### Adding New Text

1. **Add to translation files**
   ```typescript
   // lib/translations/en/common.ts
   export const common = {
     'tool.title': 'Tool Name',
     'tool.description': 'Tool description',
     'common.save': 'Save',
     'common.cancel': 'Cancel',
   };
   ```

2. **Use translation hook**
   ```typescript
   // components/ToolComponent.tsx
   import { useTranslation } from '@/hooks/use-translation';

   export const ToolComponent = () => {
     const { t } = useTranslation();
     
     return (
       <div>
         <h1>{t('tool.title')}</h1>
         <p>{t('tool.description')}</p>
       </div>
     );
   };
   ```

### Supported Languages
- English (en) - Source language
- Chinese (zh) - 简体中文
- Japanese (ja) - 日本語
- French (fr) - Français
- Spanish (es) - Español
- Russian (ru) - Русский
- German (de) - Deutsch

## 🧪 Testing

### Unit Tests
While we don't have a test suite yet, please follow these guidelines:

```typescript
// Example test structure
describe('URL Encoder', () => {
  test('should encode special characters', () => {
    const input = 'hello world!';
    const expected = 'hello%20world%21';
    const result = encodeUrl(input);
    expect(result).toBe(expected);
  });

  test('should handle empty input', () => {
    const result = encodeUrl('');
    expect(result).toBe('');
  });
});
```

### Manual Testing
Before submitting a PR, please test:

1. **Cross-browser testing**
   - Chrome
   - Firefox
   - Safari
   - Edge

2. **Device testing**
   - Desktop
   - Tablet
   - Mobile

3. **Functionality testing**
   - All encoding tools work correctly
   - No console errors
   - Responsive design
   - Dark/light mode

## 📋 Pull Request Checklist

Before submitting your PR, please check:

- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Comments added to complex code sections
- [ ] Documentation updated (if needed)
- [ ] Tests added/updated (if applicable)
- [ ] All tests pass locally
- [ ] No console errors in browser
- [ ] Accessibility standards met
- [ ] Mobile responsiveness verified
- [ ] Multi-language support (if applicable)

## 📝 Documentation

When making changes, please update:

1. **README.md** - If adding new features or tools
2. **CHANGELOG.md** - Document your changes
3. **Code comments** - For complex logic
4. **TypeScript types** - Clear interface definitions

## 🚀 Deployment

The project is automatically deployed via:

1. **Vercel** - Main deployment
2. **Static hosting** - Built files
3. **CDN** - Global distribution

No manual deployment steps required for contributions.

## 💬 Communication

- **GitHub Discussions** - General questions and ideas
- **GitHub Issues** - Bug reports and feature requests
- **Pull Request Comments** - Code review discussions

## 🎖️ Recognition

Contributors will be recognized in:

- README.md contributors section
- CHANGELOG.md for significant contributions
- GitHub contributors page

## 📞 Need Help?

If you have questions:

1. Check existing [Issues](https://github.com/SymphonyIceAttack/kitty-encode/issues)
2. Search [Discussions](https://github.com/SymphonyIceAttack/kitty-encode/discussions)
3. Create a new discussion with the `question` label

## 📜 Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code.

---

**Thank you for contributing to KittyEncode!** 🐱‍👤

Made with ❤️ by [SymphonyIceAttack](https://github.com/SymphonyIceAttack)