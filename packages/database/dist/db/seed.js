// Alan Hirsch Digital Platform - Comprehensive Seed Data
import { db } from './drizzle';
import { assessmentQuestions, assessments, contentCategories, contentItems, subscriptionPlans, userProfiles, } from './schema';
async function seed() {
    if (process.env['NODE_ENV'] === 'development') {
        console.log('🌱 Seeding Alan Hirsch Digital Platform database...');
    }
    try {
        // 1. Create subscription plans
        if (process.env['NODE_ENV'] === 'development') {
            console.log('📋 Creating subscription plans...');
        }
        const plans = await db
            .insert(subscriptionPlans)
            .values([
            {
                name: 'Free Access',
                slug: 'free',
                planType: 'free',
                priceMonthly: 0,
                priceAnnual: 0,
                contentAccessLevel: 'free',
                features: {
                    contentLimit: 5,
                    communityAccess: true,
                    aiInteractions: 0,
                    collaborationTools: false,
                    analytics: false,
                    customBranding: false,
                    apiAccess: false,
                    prioritySupport: false,
                    downloadContent: false,
                    offlineAccess: false,
                },
            },
            {
                name: 'Individual Subscriber',
                slug: 'individual',
                planType: 'individual',
                priceMonthly: 29,
                priceAnnual: 290,
                contentAccessLevel: 'premium',
                features: {
                    contentLimit: null,
                    communityAccess: true,
                    aiInteractions: 50,
                    collaborationTools: false,
                    analytics: false,
                    customBranding: false,
                    apiAccess: false,
                    prioritySupport: false,
                    downloadContent: true,
                    offlineAccess: true,
                },
            },
        ])
            .returning();
        // 2. Create content categories
        if (process.env['NODE_ENV'] === 'development') {
            console.log('📚 Creating content categories...');
        }
        const categories = await db
            .insert(contentCategories)
            .values([
            {
                name: 'Incarnational Theology',
                slug: 'incarnational-theology',
                description: "Exploring God's mission through incarnational presence",
                theologicalDiscipline: 'systematic',
                movementRelevanceScore: 10,
                apestRelevance: {
                    apostolic: 9,
                    prophetic: 8,
                    evangelistic: 9,
                    shepherding: 6,
                    teaching: 8,
                },
                keywords: ['incarnation', 'presence', 'mission', 'theology'],
            },
            {
                name: 'APEST Ministry',
                slug: 'apest-ministry',
                description: 'Five-fold ministry gifts for church multiplication',
                theologicalDiscipline: 'practical',
                movementRelevanceScore: 10,
                apestRelevance: {
                    apostolic: 10,
                    prophetic: 10,
                    evangelistic: 10,
                    shepherding: 10,
                    teaching: 10,
                },
                keywords: ['apest', 'ministry', 'gifts', 'leadership'],
            },
        ])
            .returning();
        // 3. Create Alan Hirsch profile
        if (process.env['NODE_ENV'] === 'development') {
            console.log('👤 Creating Alan Hirsch profile...');
        }
        const alanProfile = await db
            .insert(userProfiles)
            .values([
            {
                id: '550e8400-e29b-41d4-a716-446655440000',
                email: 'alan@movemental.com',
                firstName: 'Alan',
                lastName: 'Hirsch',
                displayName: 'Alan Hirsch',
                bio: 'Founding director of Forge Mission Training Network and author of numerous books on missional church, leadership, and movements.',
                ministryRole: 'seminary_professor',
                denomination: 'Forge Network',
                organizationName: 'Forge Mission Training Network',
                yearsInMinistry: 35,
                countryCode: 'AU',
                timezone: 'Australia/Melbourne',
                languagePrimary: 'en',
                culturalContext: 'western',
                leaderTier: 'core',
                subdomain: 'alan',
                customDomain: 'alanhirsch.com',
                platformTitle: 'Alan Hirsch - Missional Leadership',
                subscriptionTier: 'leader',
                theologicalFocus: [
                    'incarnational_theology',
                    'missional_ecclesiology',
                    'apest_ministry',
                ],
                onboardingCompleted: true,
                onboardingStep: 7,
                accountStatus: 'active',
            },
        ])
            .returning();
        // 4. Create APEST assessment
        if (process.env['NODE_ENV'] === 'development') {
            console.log('📝 Creating APEST assessment...');
        }
        const apestAssessment = await db
            .insert(assessments)
            .values([
            {
                id: '550e8400-e29b-41d4-a716-446655440010',
                name: 'APEST Ministry Gifts Assessment',
                slug: 'apest-ministry-gifts',
                description: 'Discover your primary ministry gifts using the APEST framework',
                assessmentType: 'apest',
                questionsCount: 25,
                estimatedDuration: 15,
                status: 'active',
                language: 'en',
                researchBacked: true,
                instructions: 'Please answer each question honestly based on your natural inclinations and experiences in ministry. There are no right or wrong answers.',
                scoringMethod: 'likert_5',
                validityScore: '0.85',
                reliabilityScore: '0.92',
            },
        ])
            .returning();
        // 5. Create assessment questions
        if (process.env['NODE_ENV'] === 'development') {
            console.log('❓ Creating assessment questions...');
        }
        const questions = await db.insert(assessmentQuestions).values([
            // Apostolic questions
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I naturally see opportunities for new ministry initiatives',
                questionType: 'likert',
                orderIndex: 1,
                isRequired: true,
                apestDimension: 'apostolic',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I enjoy pioneering new works and starting from scratch',
                questionType: 'likert',
                orderIndex: 2,
                isRequired: true,
                apestDimension: 'apostolic',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: "I feel called to expand God's kingdom into new territories",
                questionType: 'likert',
                orderIndex: 3,
                isRequired: true,
                apestDimension: 'apostolic',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I naturally think in terms of systems and structures',
                questionType: 'likert',
                orderIndex: 4,
                isRequired: true,
                apestDimension: 'apostolic',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I am energized by building and establishing new ministries',
                questionType: 'likert',
                orderIndex: 5,
                isRequired: true,
                apestDimension: 'apostolic',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            // Prophetic questions
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I feel called to speak truth to power and challenge the status quo',
                questionType: 'likert',
                orderIndex: 6,
                isRequired: true,
                apestDimension: 'prophetic',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I have a strong sense of what God is saying to the church today',
                questionType: 'likert',
                orderIndex: 7,
                isRequired: true,
                apestDimension: 'prophetic',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I am not afraid to confront injustice and call for repentance',
                questionType: 'likert',
                orderIndex: 8,
                isRequired: true,
                apestDimension: 'prophetic',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I often see things that others miss or ignore',
                questionType: 'likert',
                orderIndex: 9,
                isRequired: true,
                apestDimension: 'prophetic',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I feel compelled to warn people about spiritual dangers',
                questionType: 'likert',
                orderIndex: 10,
                isRequired: true,
                apestDimension: 'prophetic',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            // Evangelistic questions
            {
                assessmentId: apestAssessment[0].id,
                questionText: "I love sharing the gospel with people who don't know Jesus",
                questionType: 'likert',
                orderIndex: 11,
                isRequired: true,
                apestDimension: 'evangelistic',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I feel most alive when leading someone to Christ',
                questionType: 'likert',
                orderIndex: 12,
                isRequired: true,
                apestDimension: 'evangelistic',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I naturally build relationships with non-believers',
                questionType: 'likert',
                orderIndex: 13,
                isRequired: true,
                apestDimension: 'evangelistic',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I am passionate about reaching the lost and unchurched',
                questionType: 'likert',
                orderIndex: 14,
                isRequired: true,
                apestDimension: 'evangelistic',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I enjoy creating opportunities for people to hear the gospel',
                questionType: 'likert',
                orderIndex: 15,
                isRequired: true,
                apestDimension: 'evangelistic',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            // Shepherding questions
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I have a natural ability to care for and nurture people',
                questionType: 'likert',
                orderIndex: 16,
                isRequired: true,
                apestDimension: 'shepherding',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: "I feel called to protect and guide God's people",
                questionType: 'likert',
                orderIndex: 17,
                isRequired: true,
                apestDimension: 'shepherding',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I am deeply concerned about the spiritual health of believers',
                questionType: 'likert',
                orderIndex: 18,
                isRequired: true,
                apestDimension: 'shepherding',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I enjoy helping people grow in their relationship with God',
                questionType: 'likert',
                orderIndex: 19,
                isRequired: true,
                apestDimension: 'shepherding',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I have a gift for bringing healing and restoration to broken people',
                questionType: 'likert',
                orderIndex: 20,
                isRequired: true,
                apestDimension: 'shepherding',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            // Teaching questions
            {
                assessmentId: apestAssessment[0].id,
                questionText: "I love studying and explaining God's Word to others",
                questionType: 'likert',
                orderIndex: 21,
                isRequired: true,
                apestDimension: 'teaching',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I enjoy helping people understand complex theological concepts',
                questionType: 'likert',
                orderIndex: 22,
                isRequired: true,
                apestDimension: 'teaching',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I feel called to equip believers with knowledge and understanding',
                questionType: 'likert',
                orderIndex: 23,
                isRequired: true,
                apestDimension: 'teaching',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I am passionate about helping people apply biblical truth to their lives',
                questionType: 'likert',
                orderIndex: 24,
                isRequired: true,
                apestDimension: 'teaching',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
            {
                assessmentId: apestAssessment[0].id,
                questionText: 'I enjoy researching and preparing in-depth studies',
                questionType: 'likert',
                orderIndex: 25,
                isRequired: true,
                apestDimension: 'teaching',
                weight: '1.0',
                answerOptions: [
                    { value: 1, label: 'Strongly Disagree' },
                    { value: 2, label: 'Disagree' },
                    { value: 3, label: 'Neutral' },
                    { value: 4, label: 'Agree' },
                    { value: 5, label: 'Strongly Agree' },
                ],
            },
        ]);
        // 6. Create sample content
        if (process.env['NODE_ENV'] === 'development') {
            console.log('📄 Creating sample content...');
        }
        const contentItemsResult = await db
            .insert(contentItems)
            .values([
            {
                id: '550e8400-e29b-41d4-a716-446655440020',
                title: 'The Incarnational Imperative: Why Context Matters in Mission',
                slug: 'incarnational-imperative-context-mission',
                excerpt: "Understanding how Jesus' incarnation model should shape our approach to mission and ministry in different cultural contexts.",
                content: `# The Incarnational Imperative

The incarnation of Jesus Christ represents the ultimate model for mission and ministry. Just as God became flesh and dwelt among us, we are called to enter into the contexts where we serve, understanding the culture, language, and needs of the people.

## What is Incarnational Ministry?

Incarnational ministry is about being present with people in their context, just as Jesus was present with humanity. It's not about bringing our culture to others, but about understanding and engaging with their culture.

### Key Principles:

1. **Contextual Understanding**: We must understand the cultural, social, and spiritual context of those we serve
2. **Presence Over Programs**: Being with people is more important than doing things for them
3. **Listening Before Speaking**: Understanding comes before teaching
4. **Cultural Humility**: Recognizing that our way is not the only way

## The Challenge of Context

Every ministry context is unique. What works in one place may not work in another. This is why understanding context is so crucial for effective ministry.

## Conclusion

The incarnational model challenges us to step out of our comfort zones and into the lives of others, just as Jesus did for us.`,
                authorId: alanProfile[0].id,
                contentType: 'article',
                format: 'text',
                wordCount: 450,
                estimatedReadingTime: 3,
                primaryCategoryId: categories[0].id,
                tags: ['incarnation', 'mission', 'context', 'ministry'],
                theologicalThemes: [
                    'incarnational_theology',
                    'missional_ecclesiology',
                ],
                visibility: 'public',
                status: 'published',
                networkAmplificationScore: '0.0',
            },
        ])
            .returning();
        if (process.env['NODE_ENV'] === 'development') {
            console.log('✅ Database seeded successfully!');
            console.log(`📊 Created subscription plans`);
            console.log(`📚 Created content categories`);
            console.log(`👤 Created Alan Hirsch profile`);
            console.log(`📝 Created assessment`);
            console.log(`❓ Created assessment questions`);
            console.log(`📄 Created content items`);
            console.log('\n🎉 Alan Hirsch Digital Platform is ready to go!');
        }
    }
    catch (error) {
        if (process.env['NODE_ENV'] === 'development') {
            console.error('❌ Error seeding database:', error);
        }
        throw error;
    }
}
seed().catch(error => {
    if (process.env['NODE_ENV'] === 'development') {
        console.error('Seeding failed:', error);
    }
    process.exit(1);
});
//# sourceMappingURL=seed.js.map