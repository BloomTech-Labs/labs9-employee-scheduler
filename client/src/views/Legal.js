import React from 'react'
import OuterContainer from '../components/common/OuterContainer'
import TopBar from '../components/common/TopBar'
import Footer from '../components/common/Footer'
import styled from '@emotion/styled'
import system from '../design/theme'

const Legal = props => {
  const pathname = props.location.pathname.substring(1)
  return (
    <OuterContainer>
      <TopBar location={pathname} />
      <Container>
        {pathname === 'terms' ? (
          <div>
            <h1>Terms of Service</h1>
            <p>Effective date: 2/1/2019</p>
            <br />
            <h2>1. Definitions</h2>
            <p>
              When we say, “we,” “our,” or “us,” we’re referring to Cadence,
              Inc., a Delaware C Corporation, our employees, directors,
              officers, affiliates, and subsidiaries.
            </p>
            <p>
              When we say “you” or “your,” we are referring to the person or
              entity that’s registered with us to use the Cadence Services.
            </p>
            <p>
              When we say “Terms,” we mean our Terms of Service, which includes
              our Privacy Policy.
            </p>
            <p>
              When we say “Websites,” we mean our websites located at{' '}
              <a href="https://getcadence.co">https://getcadence.co</a>,
              including all subdomains and sites associated with those domains,
              and other websites that we operate now and in the future.
            </p>
            <p>
              When we say “Services,” we mean our websites, apps (web, iOS and
              Android), Application Programming Interfaces (APIs), our content,
              and various third-party services that make up Cadence.
            </p>
            <p>
              When we say “Cadence”, we mean our websites, apps and services
              collectively.
            </p>
            <p>
              When we say “information,” we mean all of the different forms of
              data that you provide us and that we collect from you from your
              use of the services, your software, and your devices.
            </p>
            <h2>2. General Rules</h2>
            <p>
              To use Cadence, you must (a) be at least eighteen (18) years of
              age; (b) complete the registration process; (c) provide current
              and accurate information; (d) agree to these Terms; and (e)
              promise to follow these rules:
            </p>
            <p>
              (1) You are responsible for all content you provide and your
              activities on Cadence; (2) You will use Cadence in compliance with
              all applicable laws, rules, and regulations; (3) You will not use
              Cadence to solicit the performance of any activity which infringes
              our rights or the rights of others; and (4) You will not use
              Cadence to upload, transmit, or otherwise distribute any
              objectionable content, as solely determined by us.
            </p>
            <p>
              If you break any of your promises above or any of the rules in
              these Terms, we may terminate your account. Your actions may also
              subject you to legal consequences.
            </p>
            <p>
              As long as you comply with our Terms of Service, we grant you a
              non-exclusive, non-transferable, limited privilege to use Cadence.
              Your use of Cadence is at your own risk.
            </p>
            <h2>3. Intellectual Property</h2>
            <p>
              You own your content. We do not represent any ownership or claim
              any intellectual property rights over the information that you
              provide or that is provided to us.
            </p>
            <p>
              We own Cadence and our Services. You may not copy, reproduce,
              alter, modify, resell, mirror, or create derivative works of
              Cadence, our Services, or our content on Cadence without our
              written permission.
            </p>
            <p>
              You shall grant to us a royalty-free, worldwide, transferable,
              sub-licensable, irrevocable and perpetual license to incorporate
              into Cadence or otherwise use any suggestions, enhancement
              requests, recommendations or other feedback that we receive from
              you or your agents.
            </p>
            <h2>4. Passwords and Accounts</h2>
            <p>
              You’re responsible for keeping your account name and password
              confidential. You’re also responsible for any account that you
              have access to. You agree to notify us immediately of any
              unauthorized use of your account(s). We’re not responsible for any
              losses due to stolen or hacked passwords.
            </p>
            <p>
              You will not represent that you are any other individual or entity
              unless such individual or entity has given you written permission
              to act on their behalf.
            </p>
            <h2>5. Payment Terms</h2>
            <p>
              The free trial offer entitles new, registered users to a fourteen
              (14) day free trial of the paid part of our Services. All fees are
              exclusive of all taxes or duties imposed by governing authorities.
              You are solely responsible for payment of all such taxes or
              duties.
            </p>
            <p>
              Monthly Plan: A valid credit card is required for you to continue
              using the paid part of the Services on a month-to-month basis
              after the fourteen (14) day free trial period ends. The Services
              are billed in advance on a monthly basis and is non-refundable.
              There will be no refunds or credits for partial months, for
              account upgrades or downgrades, or for months unused with an open
              account.
            </p>
            <p>
              We reserve the right to change service fees upon thirty (30) days
              notice. Such notice may be provided at any time by posting the
              changes to Cadence or by email.
            </p>
            <h2>6. Cancellation and Termination</h2>
            <p>
              You are solely responsible for the proper cancellation of your
              account. You may cancel your account at any time by going to
              Company Settings and closing your account. An email or phone
              request to cancel your account is not considered cancellation. You
              will not be charged after cancellation. There is no cancellation
              fee.
            </p>
            <p>
              In the event of cancellation or termination, your account will be
              immediately disabled, and your account and information cannot be
              recovered once the account is closed. We retain the right to
              retain or delete data provided to us by you at our sole
              discretion.
            </p>
            <p>
              We also reserve the right but do not have any obligation, to
              refuse service to anyone and close your account(s) without notice
              for any or no reason at all.
            </p>
            <h2>7. API Terms</h2>
            <p>
              You may access your Cadence account data using the Cadence API
              (Application Programming Interface). Any use of the API, including
              the use of the API through a third-party product that accesses
              Cadence, is bound by these Terms.
            </p>
            <p>
              You expressly understand and agree that we shall not be liable for
              any direct, indirect, incidental, special, consequential or
              exemplary damages, including but not limited to damages for loss
              of profits, goodwill, use, data, or other intangible losses (even
              if we have been advised of the possibility of such damages)
              resulting from your use of the API or third-party products that
              access your data via the API.
            </p>
            <p>
              Abuse or excessively frequent requests to Cadence via the API may
              result in the temporary or permanent suspension of your access to
              the API. We may, at our sole discretion, determine abuse or
              excessive usage of the API. We reserve the right at any time to
              modify or discontinue, temporarily or permanently, your access to
              the API (or any part thereof) with or without notice.
            </p>
            <h2>8. Indemnification</h2>
            <p>
              You agree to indemnify and hold us harmless from any and all
              demands, loss, liability, claims or expenses (including attorneys’
              fees) made against us by any third party due to or arising out of
              or in connection with your use of Cadence.
            </p>
            <h2>9. Representations and Warranties</h2>
            <p>
              To the maximum extent permitted by law, we provide Cadence on an
              “as is” and “as available” basis, which means we don’t provide
              warranties of any kind, either express or implied, including, but
              not limited to, warranties of merchantability and fitness for a
              particular purpose and to any warranties that (i) Cadence will
              meet your specific requirements, (ii) Cadence will be
              uninterrupted, timely, secure, or error-free, (iii) the results
              that may be obtained from the use of Cadence will be accurate or
              reliable, (iv) the quality of any products, services, information,
              or other material purchased or obtained by you through Cadence
              will meet your expectations, and (v) any errors in Cadence will be
              corrected.
            </p>
            <h2>10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, you assume full
              responsibility for and we disclaim liability to you for any
              indirect, consequential, exemplary, incidental, or punitive
              damages, including lost profits, even if we had been advised of
              the possibility of such damages.
            </p>
            <p>
              We disclaim any and all liability for the acts, omissions, and
              conduct of any third parties related to your use of Cadence and
              any linked sites and services. Your sole remedy against us for
              dissatisfaction with Cadence is to stop using Cadence. This
              limitation of relief is a part of the bargain between you and us.
              The preceding disclaimer applies to any damages, liability, or
              injuries whether for breach of contract, tort, negligence or any
              other cause of action.
            </p>
            <p>
              If, notwithstanding the other provisions of the Terms, we are
              found to be liable to you for any damage or loss which arises out
              of or is in any way connected with your use of the Website or any
              of our Services, our liability shall not exceed what you paid us
              for the Services in the previous month. Some jurisdictions do not
              allow limitations of liability, so the foregoing limitation may
              not apply to you.
            </p>
            <h2>11. Governing Law; Dispute Resolution</h2>
            <p>
              You agree that all matters relating to your access to or use of
              Cadence, including all disputes, will be governed by the laws of
              the United States and by the laws of the State of Delaware without
              regard to its conflicts of laws provisions. You agree to the
              personal jurisdiction by and venue in the Delaware Court of
              Chancery, and waive any objection to such jurisdiction or venue.
              Any claim under these Terms of Use must be brought within one (1)
              year after the cause of action arises, or such claim or cause of
              action is barred.
            </p>
            <p>
              No recovery may be sought or received for damages other than
              out-of-pocket expenses, except that the prevailing party will be
              entitled to costs and attorneys’ fees. In the event of any
              controversy or dispute between us and you arising out of or in
              connection with your use of the Websites or Services, the parties
              shall attempt, promptly and in good faith, to resolve any such
              dispute. If we are unable to resolve any such dispute within a
              reasonable time (not to exceed thirty (30) days), then either
              party may submit such controversy or dispute to mediation. If the
              dispute cannot be resolved through mediation, then the parties
              shall be free to pursue any right or remedy available to them
              under applicable law.
            </p>
            <h2>12. Force Majeure</h2>
            <p>
              You agree that we are not liable for any delays or failure in
              performance of any part of the Services, from any cause beyond our
              control.
            </p>
            <h2>13. Severability</h2>
            <p>
              If one or more sections of the Terms are held unenforceable, then
              those sections will be removed or edited as little as necessary,
              and the rest of the Terms will still be valid and enforceable.
            </p>
            <h2>14. Assignments</h2>
            <p>
              You may not assign any of your rights under this agreement to
              anyone else. We may assign our rights to any other individual or
              entity at our discretion.
            </p>
            <h2>15. No Waiver</h2>
            <p>
              Our failure to exercise or enforce any right or provision of the
              Terms shall not constitute a waiver of such right or provision.
            </p>
            <h2>16. Entire Agreement</h2>
            <p>
              These Terms and all documents incorporated into these Terms by
              reference constitute the entire agreement between you and us and
              govern your use of Cadence, superseding any prior agreements
              between you and us (including, but not limited to, any prior
              versions of the Terms of Service).
            </p>
            <h2>17. Amendments and Changes to Cadence</h2>
            <p>
              We reserve the right, at our sole discretion, to change, modify,
              add, or remove portions of the Terms, at any time. Amendments or
              changes to these Terms won’t be effective until we post revised
              Terms on the Website. Unless explicitly stated otherwise, any new
              features that augment or enhance Cadence shall be subject to the
              Terms.
            </p>
            <p>
              It is your responsibility to check the Terms periodically for
              changes. Your continued use of Cadence following the posting of
              changes will mean that you accept and agree to the changes.
            </p>
            <p>
              We reserve the right to do any of the following, at any time,
              without notice to you: (1) to modify, suspend or terminate
              operation of or access to Cadence, or any portion of Cadence for
              any reason; (2) to modify or change Cadence, or any portion of
              Cadence, and any applicable policies or terms; and (3) to
              interrupt the operation of Cadence, or any portion of Cadence, as
              necessary to perform routine or non-routine maintenance, error
              correction, or other changes.
            </p>
            <h2>18. Questions</h2>
            <p>
              If you have any questions or concerns about the Terms, please
              email us at{' '}
              <a href="mailto:getcadence@gmail.com">getcadence@gmail.com</a>.
            </p>
          </div>
        ) : (
            <div>
              <h1>Privacy Policy</h1>
              <p>Effective date: 2/1/2019</p>
              <br />
              <h2>The Gist</h2>
              <p>
                Cadence will collect certain non-personally identify information
                about you as you use our site(s). We may use this data to better
                understand our users. We can also publish this data, but the data
                will be about a large group of users, not individuals.
            </p>
              <br />

              <p>
                We will also ask you to provide personal information, but you'll
                always be able to opt out. If you give us personal information, we
                won't do anything evil with it.
            </p>
              <br />

              <p>
                We can also use cookies, without which our product cannot
                function. While you may disable such cookies, Cadence cannot
                guarantee the product's functionality in such cases.
            </p>
              <br />

              <p>
                That's the basic idea, but you must read through the entire
                Privacy Policy below and agree with all the details before you use
                any of our sites.
            </p>
              <br />

              <h2>Reuse</h2>
              <p>
                This document is based upon the{' '}
                <a href="https://automattic.com/privacy/">
                  Automattic Privacy Policy
              </a>{' '}
                and is licensed under{' '}
                <a href="https://creativecommons.org/licenses/by-sa/2.5/">
                  Creative Commons Attribution Share-Alike License 2.5
              </a>
                . Basically, this means you can use it verbatim or edited, but you
                must release new versions under the same license and you have to
                credit Automattic somewhere (like this!). Automattic is not
                connected with and does not sponsor or endorse Cadence or its use
                of the work.
            </p>
              <br />

              <p>
                Cadence, Inc. ("Cadence") makes available services include our web
              sites (<a href="https://getcadence.co">https://getcadence.co</a>),
                our API, and any other software, sites, and services offered by
                Cadence in connection to any of those (taken together, the
                "Service"). It is Cadence's policy to respect your privacy
                regarding any information we may collect while operating our
                websites.
            </p>
              <br />

              <h2>Questions</h2>
              <p>
                If you have question about this Privacy Policy, please contact us
              at <a href="mailto:getcadence@gmail.com">getcadence@gmail.com</a>.
            </p>
              <br />

              <h2>Visitors</h2>
              <p>
                Like most website operators, Cadence collects
                non-personally-identifying information of the sort that web
                browsers and servers typically make available, such as the browser
                type, language preference, referring site, and the date and time
                of each visitor request. Cadence's purpose in collecting
                non-personally identifying information is to better understand how
                Cadence's visitors use its website. From time to time, Cadence may
                release non-personally-identifying information in the aggregate,
                e.g., by publishing a report on trends in the usage of its
                website.
            </p>
              <br />

              <p>
                Cadence also collects potentially personally-identifying
                information like Internet Protocol (IP) addresses. Cadence does
                not use such information to identify its visitors, however, and
                does not disclose such information, other than under the same
                circumstances that it uses and discloses personally-identifying
                information, as described below. We may also collect and use IP
                addresses to block users who violated our Terms of Service.
            </p>
              <br />

              <h2>Gathering of Personally-Identifying Information</h2>
              <p>
                Certain visitors to Cadence's websites choose to interact with
                Cadence in ways that require Cadence to gather
                personally-identifying information. The amount and type of
                information that Cadence gathers depends on the nature of the
                interaction. Cadence collects such information only insofar as is
                necessary or appropriate to fulfill the purpose of the visitor's
                interaction with Cadence. Cadence does not disclose
                personally-identifying information other than as described below.
                And visitors can always refuse to supply personally-identifying
                information, with the caveat that it may prevent them from
                engaging in certain Service-related activities.
            </p>
              <br />

              <p>
                Additionally, some interactions, such as posting a comment, may
                ask for optional personal information. For instance, when posting
                a comment, may provide a website that will be displayed along with
                a user's name when the comment is displayed. Supplying such
                personal information is completely optional and is only displayed
                for the benefit and the convenience of the user.
            </p>
              <br />

              <h2>Aggregated Statistics</h2>
              <p>
                Cadence may collect statistics about the behavior of visitors to
                the Service. For instance, Cadence may monitor the most popular
                parts of the Service. Cadence may display this information
                publicly or provide it to others. However, Cadence does not
                disclose personally-identifying information other than as
                described below.
            </p>
              <br />

              <h2>Protection of Certain Personally-Identifying Information</h2>
              <p>
                Cadence discloses potentially personally-identifying and
                personally-identifying information only to those of its employees,
                contractors and affiliated organizations that (i) need to know
                that information in order to process it on Cadence's behalf or to
                provide services available at Cadence's websites, and (ii) that
                have agreed not to disclose it to others. Some of those employees,
                contractors and affiliated organizations may be located outside of
                your home country; by using the Service, you consent to the
                transfer of such information to them. Cadence will not rent or
                sell potentially personally-identifying and personally-identifying
                information to anyone. Other than to its employees, contractors
                and affiliated organizations, as described above, Cadence
                discloses potentially personally-identifying and
                personally-identifying information only when required to do so by
                law, or when Cadence believes in good faith that disclosure is
                reasonably necessary to protect the property or rights of Cadence,
              third parties or the public at large.{' '}
              </p>
              <br />

              <p>
                If you are a registered user of the Service and have supplied your
                email address, Cadence may occasionally send you an email to tell
                you about new features, solicit your feedback, or just keep you up
                to date with what's going on with Cadence and our products. We
                primarily use our website and blog to communicate this type of
                information, so we expect to keep this type of email to a minimum.
                If you send us a request (for example via a support email or via
                one of our feedback mechanisms), we reserve the right to publish
                it in order to help us clarify or respond to your request or to
                help us support other users. Cadence takes all measures reasonably
                necessary to protect against the unauthorized access, use,
                alteration or destruction of potentially personally-identifying
                and personally-identifying information.
            </p>
              <br />

              <h2>Cookies</h2>
              <p>
                A cookie is a string of information that a website stores on a
                visitor's computer, and that the visitor's browser provides to the
                Service each time the visitor returns. Cadence uses cookies to
                help Cadence identify and track visitors, their usage of Cadence
                Service, and their Service access preferences. Cadence visitors
                who do not wish to have cookies placed on their computers should
                set their browsers to refuse cookies before using Cadence's
                websites, with the drawback that certain features of Cadence's
                websites may not function properly without the aid of cookies.
            </p>
              <br />

              <h2>Data Storage</h2>
              <p>
                Cadence uses third party vendors and hosting partners to provide
                the necessary hardware, software, networking, storage, and related
                technology required to run the Service. You understand that
                although you retain full rights to your data, it may be stored on
                third party storage and transmitted through third party networks.
            </p>
              <br />

              <h2>Privacy Policy Changes</h2>
              <p>
                Although most changes are likely to be minor, Cadence may change
                its Privacy Policy from time to time, and in Cadence's sole
                discretion. Cadence encourages visitors to frequently check this
                page for any changes to its Privacy Policy. Your continued use of
                this site after any change in this Privacy Policy will constitute
                your acceptance of such change.
            </p>
              <br />
            </div>
          )}
      </Container>
      <Footer />
    </OuterContainer>
  )
}

export default Legal

const Container = styled('div')`
  margin: 0 5rem;
  padding: 8rem 4rem;
  background: white;
  box-shadow: ${system.shadows.otherLight};
  position: relative;

  @media ${system.breakpoints[1]} {
    padding: 8rem 2rem;
  }

  h2,
  p {
    margin: 0 25px;
    padding: 7.5px 15px;
    width: 60%;
    line-height: ${system.spacing.lineHeight};

    @media ${system.breakpoints[1]} {
      margin: 0;
      padding: 7.5px 0;
      width: 100%;
    }
  }

  h2 {
    margin-top: 10px;
    color: ${system.color.primary};
    font-size: ${system.fontSizing.ml};

    @media ${system.breakpoints[1]} {
      font-size: ${system.fontSizing.m};
    }
  }

  p {
    color: ${system.color.bodytext};
    font-size: ${system.fontSizing.sm};
  }
`
