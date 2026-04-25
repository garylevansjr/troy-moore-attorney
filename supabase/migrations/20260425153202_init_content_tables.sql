-- ─────────────────────────────────────────────────────────────────────────────
-- Content tables for Troy Moore Law
-- All tables are read-only via anon key (RLS enforced)
-- ─────────────────────────────────────────────────────────────────────────────

-- Videos ─────────────────────────────────────────────────────────────────────
create table public.videos (
  id          serial primary key,
  slug        text not null unique,
  title       text not null,
  eyebrow     text not null default '',
  description text not null default '',
  youtube_id  text not null,
  topics      jsonb not null default '[]',
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.videos enable row level security;
create policy "videos_public_read" on public.videos for select using (true);
create index on public.videos (sort_order);

insert into public.videos (slug, title, eyebrow, description, youtube_id, topics, sort_order) values
(
  'estate-planning-attorney-texas-video',
  'ESTATE PLANNING IN TEXAS: Watch This Before It''s Too Late!',
  'On-Demand Workshop',
  'An on-demand estate planning workshop led by Houston estate planning attorney Troy M. Moore. Covers the importance of estate planning for Texans, how to avoid probate and protect your assets, wills vs. trusts, and the most common estate planning mistakes to avoid.',
  'ZnPaEH_039E',
  '["Why estate planning matters for Texas residents","How to avoid probate and protect your assets","Wills vs. trusts — which is right for you?","Common estate planning mistakes to avoid","How to start your estate plan today"]',
  1
),
(
  'video-animation-estate-planning-options-for-texans',
  'Estate Planning Options for Texans',
  'Animated Guide',
  'An animated slideshow presentation walking through the full range of estate planning options available to Texas residents — from simple wills to living trusts, powers of attorney, transfer on death deeds, and probate avoidance strategies.',
  '47UIQ0B3qeU',
  '["Overview of Texas estate planning options","Living trusts and probate avoidance","Transfer on Death Deeds (TODD)","Powers of attorney and advance directives","Choosing the right strategy for your situation"]',
  2
),
(
  'estate-planning-attorney-texas',
  'Estate Planning Options for Texas Residents',
  'Attorney Guide',
  'A comprehensive video guide to estate planning tailored for Texas residents — covering Texas-specific regulations, key benefits of proper planning, and best practices for protecting your family''s future. Includes information for both married couples and single individuals.',
  'GXQuNGbrUVA',
  '["Texas-specific estate planning regulations","Options for married couples and single individuals","Protecting assets and preserving wealth","Working with a Texas estate planning attorney","How to get started with a personalized plan"]',
  3
);

-- Testimonials ───────────────────────────────────────────────────────────────
create table public.testimonials (
  id          serial primary key,
  body        text not null,
  author      text not null,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.testimonials enable row level security;
create policy "testimonials_public_read" on public.testimonials for select using (true);
create index on public.testimonials (sort_order);

insert into public.testimonials (body, author, sort_order) values
('Extremely professional and knowledgeable! After starting our trust with Troy Moore, I feel like we have a long lasting trusted ally in making sure All the Things are arranged and smooth when our lives have ended.', 'K.W.', 1),
('Troy and his team were great throughout our estate planning. Professional, patient, and informative. If you have not already taken care of your future, I highly recommend Troy Moore.', 'Tim Williams', 2),
('Troy was extremely helpful in navigating us through the briars in setting up our will and trust. My wife and I would not hesitate to refer him to others.', 'Bill Darnell', 3),
('Troy Moore took care of all my "Will" needs. He was very professional and the process was effortless. I would highly recommend Troy!', 'Ruth Scott', 4),
('Troy and Tiffany deserve an A plus. They were a huge blessing to help me through this process with the system. Thank you very much for all you do!', 'Eric Lamount', 5),
('Great experience, explained everything thoroughly.', 'Missi Nalback', 6);

-- FAQ ────────────────────────────────────────────────────────────────────────
create table public.faq (
  id          serial primary key,
  category    text not null,
  question    text not null,
  answer      text not null,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.faq enable row level security;
create policy "faq_public_read" on public.faq for select using (true);
create index on public.faq (category);
create index on public.faq (sort_order);

insert into public.faq (category, question, answer, sort_order) values
('Probate', 'Can I handle probate myself in Texas, or do I need a lawyer?', '<p>You may handle probate alone for simple cases, but hiring a probate attorney is recommended when:</p><ul><li>The estate is large or complex.</li><li>Disputes arise between heirs.</li><li>The Will is missing or unclear.</li></ul>', 1),
('Probate', 'How do I start the probate process in Houston?', '<p>To start probate, you must:</p><ul><li>File an application in Harris County Probate Court.</li><li>Attend a probate hearing to confirm the executor.</li><li>Notify creditors and beneficiaries.</li><li>Inventory and appraise assets.</li><li>Pay debts and distribute assets.</li></ul><p>For personalized legal help, schedule a free consultation.</p>', 2),
('Probate', 'How does probate work for out-of-state executors in Texas?', '<p>Out-of-state executors must:</p><ul><li>File a probate application in Harris County.</li><li>Appoint a registered agent in Texas <em>(don''t worry — we will do this for you).</em></li><li>Comply with Texas probate laws.</li></ul><p>Our firm provides legal guidance for out-of-state executors and routinely represents executors from all over the world.</p>', 3),
('Probate', 'Can probate be contested in Texas?', '<p>Yes, probate can be contested for:</p><ul><li>Fraud or undue influence in the will.</li><li>Lack of mental capacity of the deceased.</li><li>Improper Will execution (e.g., missing signatures).</li></ul><p>Heirs must contest probate within two years of probate opening.</p>', 4),
('Probate', 'What are the duties of an executor in Texas probate?', '<p>An Executor must:</p><ul><li>File the will with the Harris County Probate Court.</li><li>Notify heirs and creditors.</li><li>Pay debts and taxes from the estate.</li><li>Distribute assets as outlined in the will.</li></ul>', 5),
('Probate', 'How do I find a probate attorney in Houston?', '<p>To find a reliable Houston probate attorney:</p><ul><li>Choose an attorney with experience in Texas probate law.</li><li>Read client reviews and testimonials.</li><li>Ensure they handle contested and uncontested probate cases.</li></ul><p>Schedule a free consultation to discuss your case.</p>', 6),
('Probate', 'Can I avoid probate in Houston, Texas?', '<p>Yes, probate can be avoided by:</p><ul><li>Creating a revocable living trust.</li><li>Naming beneficiaries on financial accounts.</li><li>Holding property in joint tenancy with survivorship rights.</li><li>Using a Transfer-on-Death (TOD or TODD) deed for real estate.</li></ul>', 7),
('Probate', 'What probate court handles cases in Houston, TX?', '<p>Houston probate cases are handled by Harris County Probate Courts:</p><ul><li><a href=''https://probate.harriscountytx.gov/Probate-Court-No-1'' target=''_blank'' rel=''noopener''><strong>Probate Court No. 1</strong></a></li><li><a href=''https://probate.harriscountytx.gov/Probate-Court-No-2'' target=''_blank'' rel=''noopener''><strong>Probate Court No. 2</strong></a></li><li><a href=''https://probate.harriscountytx.gov/Probate-Court-No-3'' target=''_blank'' rel=''noopener''><strong>Probate Court No. 3</strong></a></li><li><a href=''https://probate.harriscountytx.gov/Probate-Court-No-4'' target=''_blank'' rel=''noopener''><strong>Probate Court No. 4</strong></a></li></ul><p>These courts oversee estate administration, contested wills, and guardianships.</p>', 8),
('Probate', 'How much does probate cost in Texas?', '<p>Probate costs depend on estate complexity but generally include:</p><ul><li>Court filing fees: $700 – $1,600</li><li>Attorney fees: Starting at $3,000</li><li>Executor fees: Set by law or the will</li><li>Other costs: Appraisals, bond fees, and creditor notifications</li></ul><p>For a cost estimate, schedule a probate consultation.</p>', 9),
('Probate', 'Do all estates have to go through probate in Texas?', '<p>No, not all estates require probate. Texas law allows for probate avoidance when:</p><ul><li>The estate is under $75,000 (Small Estate Affidavit).</li><li>Assets are placed in a revocable living trust.</li><li>Property is co-owned with survivorship rights.</li><li>Accounts have named beneficiaries (e.g., life insurance, retirement funds).</li></ul>', 10),
('Probate', 'What is probate in Texas and how does it work?', '<p>Probate in Texas is the legal process of settling a deceased person''s estate. It involves:</p><ul><li>Validating the will (if one exists).</li><li>Appointing an executor or administrator.</li><li>Identifying and valuing assets.</li><li>Paying debts and taxes.</li><li>Distributing remaining assets to beneficiaries.</li></ul><p>Texas offers simplified probate options, such as independent administration, which can speed up the process.</p>', 11),
('Probate', 'Does a surviving spouse need to probate their deceased spouse''s estate in Texas?', '<p>Probably, unless the deceased spouse did proper estate planning to avoid probate court. 90% of the time, real estate is the primary reason why probate is required. If there are bank accounts that the surviving spouse was not an account-holder on, that is another common reason for needing to go to Probate Court.</p><p>The bottom line is, if you have probate assets that are community assets purchased during the marriage, probate will be required for any formal transfer of title that needs to be recognized in the public domain.</p>', 12),
('Probate', 'The Will leaves me everything — why do I still need to go to Probate Court?', '<p>Probate Court is where a person''s Last Will &amp; Testament is examined by the Judge in order to make sure it is a valid Will.</p><p>But, secondarily, the probate process — generally called Administration — is primarily there as a way for creditors to collect any debts owed by the Deceased individual.</p><p>The Probate Court Administration consists of a public process where the Will is offered for probate, and then, after a designated waiting period, a personal representative is appointed by the Court (i.e. an Executor or Administrator).</p><p>This allows for the public at large to rely on that Will, filed for record in the Probate Court, as the person''s actual very Last Will &amp; Testament, and not a previous Will that has been revoked.</p>', 13),
('Probate', 'How long does probate take in Texas?', '<p>The probate process in Houston typically takes 1 to 3 months, but it can take longer if the estate is contested. Factors affecting probate length include:</p><ul><li>Whether there is a valid will.</li><li>The complexity of the estate.</li><li>Potential disputes among heirs.</li><li>Court schedules in Harris County.</li></ul>', 14),
('Probate', 'What questions should I ask a probate attorney?', '<p>You should find out the following:</p><ul><li>How long has the attorney been practicing probate law?</li><li>Who gets what and in what percentages under the Will or heirship law?</li><li>Is the Will a valid Last Will &amp; Testament under Texas law?</li><li>What if I do not get along with certain members of my family?</li><li>Who will be in charge of distributing the family members'' property?</li><li>How long will this process take?</li><li>When will I be able to transfer property and gain access to bank accounts?</li></ul>', 15),
('Probate', 'What do I need to bring to a probate lawyer?', '<p>You should bring your experienced probate attorney the following:</p><ul><li>The Last Will &amp; Testament (if there is one) &amp; all Wills &amp; Trusts of the deceased.</li><li>The Death Certificate (if you already have it — if not, that is fine to go without it).</li><li>Any available bank statements for any accounts that did not have joint account holders.</li><li>Any letters from life insurance companies for policies that will pass through the probate estate.</li><li>A list of questions to ask a probate attorney.</li><li>Any business corporate books for any business owned wholly or in part by the deceased.</li><li><a href=''/practices/probate-avoidance-package''>Transfer on Death Deeds</a> made prior to the deceased''s death.</li><li>Recent retirement account statements from all accounts owned by the deceased.</li><li>Any Living Trust that the deceased is a beneficiary of (one that he/she did not create).</li></ul>', 16),
('Probate', 'Is a lawyer needed for probate?', '<p>Probate law does not legally require a probate attorney. However, just like with a broken leg, you are not required to see a doctor to set the bone — but you are far better off with professional help.</p><p>You are far better off hiring an attorney who has a practice focus on probate and estate administration, especially when the stakes involve family assets and court proceedings.</p>', 17),
('Probate', 'How much does an attorney charge for probate?', '<p>Legal representation for probate is usually done by a flat fee, if possible. Probate lawyer fees vary widely depending on the attorney''s experience.</p><p>An experienced probate attorney with decades of experience will charge more than a newly licensed lawyer. When trying to determine the cost, it is usually less than four thousand dollars.</p>', 18),
('Probate', 'What does a probate lawyer do?', '<p>A probate lawyer is an attorney who practices law with a focus on probate and estate administration. Probate law deals with Wills, sometimes including Trusts, and how they translate into probate and estates.</p><p>The probate process is related to Wills and Trusts because they can interplay together before the Judge at Probate Court. Probate law also applies to estates of people who died without a Last Will &amp; Testament — when you die without a Will, you are said to have died "Intestate."</p>', 19),
('Estate Planning', 'What happens if someone dies without a will in Texas?', '<p>If someone dies without a will, Texas intestate succession laws apply:</p><ul><li>The spouse and children inherit first.</li><li>If unmarried, parents and siblings inherit.</li><li>If no close relatives exist, the estate may escheat to the state.</li></ul>', 20),
('Estate Planning', 'Do all estates have to go through probate in Texas?', '<p>No, not all estates require probate. Texas law allows for probate avoidance when:</p><ul><li>The estate is under $75,000 (Small Estate Affidavit).</li><li>Assets are placed in a revocable living trust.</li><li>Property is co-owned with survivorship rights.</li><li>Accounts have named beneficiaries (e.g., life insurance, retirement funds).</li></ul>', 21),
('Estate Planning', 'Does a surviving spouse need to probate their deceased spouse''s estate in Texas?', '<p>Probably, unless the deceased spouse did proper estate planning to avoid probate court. 90% of the time, real estate is the primary reason why probate is required. If there are bank accounts that the surviving spouse was not an account-holder on, that is another common reason for needing to go to Probate Court.</p><p>The bottom line is, if you have probate assets that are community assets purchased during the marriage, probate will be required for any formal transfer of title that needs to be recognized in the public domain.</p>', 22),
('Estate Planning', 'The Will leaves me everything — why do I still need to go to Probate Court?', '<p>Probate Court is where a person''s Last Will &amp; Testament is examined by the Judge in order to make sure it is a valid Will.</p><p>But, secondarily, the probate process — generally called Administration — is primarily there as a way for creditors to collect any debts owed by the Deceased individual.</p><p>The Probate Court Administration consists of a public process where the Will is offered for probate, and then, after a designated waiting period, a personal representative is appointed by the Court (i.e. an Executor or Administrator).</p><p>This allows for the public at large to rely on that Will, filed for record in the Probate Court, as the person''s actual very Last Will &amp; Testament, and not a previous Will that has been revoked.</p>', 23),
('Other Practices', 'What if the deceased had debts in Texas?', '<p>Debts must be settled before distributing assets. However, heirs are NOT responsible for debts unless:</p><ul><li>They co-signed a loan.</li><li>They are spouses in a community property marriage.</li></ul>', 24),
('Other Practices', 'What is considered to be a personal injury?', '<p>In Texas, recoverable damages for someone injured by someone else include the following:</p><ul><li>Medical bills from the past</li><li>Medical bills for the future</li><li>Physical impairment in the past</li><li>Physical impairment in the future</li><li>Disfigurement in the past</li><li>Disfigurement in the future</li><li>Mental Anguish from the past</li><li>Mental Anguish for the future</li><li>Lost wages from the past</li><li>Lost wages from the future</li><li>Loss of earning capacity in the past</li><li>Loss of earning capacity in the future</li><li>Punitive damages</li></ul>', 25),
('Other Practices', 'How do I talk to a personal injury lawyer?', '<p>First thing, EVERYTHING you talk to your personal injury lawyer about is privileged and confidential. You should concentrate on giving your personal injury lawyer as much information as possible — even if it is bad for your case.</p><p>Personal injury attorneys say, "It''s much easier to explode your own bombs" — and the old saying is very true.</p><p>Insurance companies will treat you like a criminal from the moment they get you on the phone. Your Texas personal injury lawyer is well versed in dealing with insurance companies on your behalf.</p>', 26),
('Other Practices', 'What does a personal injury lawyer do?', '<p>Your personal injury car accident lawyer will work with all effort to get your serious injuries, medical bills, and medical treatment paid for by the other driver who caused the car wreck.</p><p>Texas injury law is constantly changing, and any reliable accident attorney keeps up with those changes. Your personal injury lawyer will file your case, work it up, and take the case to trial if necessary.</p><p>While a lot of cases settle prior to trial, more and more cases are going to trial nowadays because insurance companies are getting worse at paying rightful claims.</p>', 27),
('Other Practices', 'What percentage does a personal injury lawyer take?', '<p>There is <strong>NO FEE UNLESS WE WIN</strong> with Texas personal injury attorneys. This arrangement is called a "contingent fee" — meaning your personal injury attorney charges nothing unless money is recovered, which can help pay your medical bills.</p><p>The fee is generally 1/3 of the gross recovery if the case settles prior to litigation, or 40% of the gross recovery if the personal injury claim has been filed at the Courthouse.</p><p>The law firm you select to represent you needs to be a quality law firm with a personal injury attorney you feel comfortable with — and a record of successful results.</p>', 28);

-- Homepage posts (latest-posts carousel) ────────────────────────────────────
create table public.homepage_posts (
  id                 serial primary key,
  title              text not null,
  description        text not null,
  category           text not null,
  image              text not null,
  href               text not null,
  overlay_color      text not null default '#0b375d',
  overlay_text_color text not null default '#ffffff',
  sort_order         int  not null default 0,
  created_at         timestamptz not null default now()
);

alter table public.homepage_posts enable row level security;
create policy "homepage_posts_public_read" on public.homepage_posts for select using (true);
create index on public.homepage_posts (sort_order);

insert into public.homepage_posts (title, description, category, image, href, overlay_color, overlay_text_color, sort_order) values
('Navigate Texas Probate Courts', 'Efficiently guide you through the complex Texas probate system with expert knowledge and proven strategies that save time and reduce stress, with the support of our trusted Texas probate attorney.', 'PROBATE', '/assets/s1.png', '/probate', '#6B3A5E', '#ffffff', 1),
('Create Customized Wills & Trusts', 'Develop personalized estate planning documents that reflect your wishes and protect your family''s future for generations to come.', 'ESTATE PLANNING', '/assets/s2.png', '/estate-planning', '#D4D95E', '#0b375d', 2),
('Protect Assets & Avoid Probate Court', 'Shield your assets from costly litigation, unnecessary antiquated probate court procedures, and family disputes with strategic legal planning designed to preserve family wealth.', 'ASSET PROTECTION', '/assets/s3.png', '/practices/probate-avoidance-package', '#6B3A5E', '#ffffff', 3),
('Challenge Invalid Wills', 'Protect your inheritance rights by contesting wills affected by undue influence, fraud, forgery, or lack of mental capacity, with experienced representation focused on honoring your loved one''s true intentions.', 'WILL CONTESTS', '/assets/s4.png', '/practices/houston-contested-will-attorney', '#D4D95E', '#0b375d', 4),
('Resolve Trust & Title Disputes', 'Take swift action against trustee misconduct, misused assets, and fraudulent property transfers with strategic legal support designed to protect beneficiaries and restore rightful ownership.', 'TRUST DISPUTES', '/assets/s5.png', '/practices/houston-trust-attorney', '#6B3A5E', '#ffffff', 5);

-- Featured article ───────────────────────────────────────────────────────────
create table public.featured_article (
  id               serial primary key,
  eyebrow          text not null default '',
  headline         text not null,
  description      text not null,
  button_text      text not null default 'Learn More',
  button_href      text not null,
  background_image text not null default '',
  article_image    text not null default '',
  updated_at       timestamptz not null default now()
);

alter table public.featured_article enable row level security;
create policy "featured_article_public_read" on public.featured_article for select using (true);

insert into public.featured_article (eyebrow, headline, description, button_text, button_href, background_image, article_image) values
(
  'TROY M. MOORE',
  'When Probate Feels Overwhelming, You Need an experienced probate attorney in houston.',
  'At the Law Office of Troy M. Moore, we don''t just handle cases; we protect families, legacies, and futures. You''ll never be a file number here like at a big firm; you''ll work directly with Troy Moore, a proven Houston probate attorney who combines relentless advocacy with personalized attention.',
  'Get a Case Evaluation',
  '/contact',
  '/assets/blue.png',
  '/assets/article1.png'
);
